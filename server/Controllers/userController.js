const mongoose = require('mongoose');
const User = require('../Models/User');
const Post = require('../Models/Post');

const readUsers = async (req,res) =>{
    let sent = false
    try {
        const users = await User.find().clone();
        if(res) {
            res.status(200).json(users);
            sent = true;
        }
        else return users;
    } catch (err) {
        if(res) {
            if(!sent)
                res.status(404).json({error: err.message});
        }
    }
    return null;
}

const searchUsers = async (req, res) => {
    let sent = false;
    try {
        let users = null
        let method = req.body.searchBy
        let content = req.body.keyword
        if(!content){
            res.status(400).json({error: 'No keywords entered for search query,or no search method selected'});
            sent = true;
        }
        else if(!content.includes(' ')) {
            const regex = new RegExp(content, 'i') // i for case insensitive
            if(!method)
                users = await User.find({$or: [{firstName: {$regex: regex}}, {lastName: {$regex: regex}}]}).clone();
            else{
                if(method === 'firstName')
                    users = await User.find({firstName: {$regex: regex}}).clone();
                else if (method === 'lastName')
                    users = await User.find({lastName: {$regex: regex}}).clone();
                else {
                    res.status(400).json({error: 'Invalid filter clause'});
                    sent = true;
                }
            }
        }
        else
        {
            let values = content.split(' ', 1);
            const firstNameRegex = new RegExp(values[0], 'i') // i for case insensitive
            const lastNameRegex = new RegExp(values[1], 'i') // i for case insensitive
            users = await User.find({$and: [{firstName: {$regex: firstNameRegex}}, {lastName: {$regex: lastNameRegex}}]}).clone();
        }
        if(!sent){
            res.status(200).json(users);
            sent = true;
        }

    }
    catch (err) {
        if(!sent)
            res.status(400).json({error: err});
    }
}

const logIn = async (req,res) => {
    let sent = false;
    try{
        await User.findOne({email: req.body.email}, function (err, docs) {
            if (err || !docs){
                res.status(404).json({message:'No user found with this email.', isSuccess:false});
                sent = true;
            }
            else{
                console.log(docs)
                if(req.body.password !== docs.password){
                    if(!sent) {
                        res.status(400).json({
                            message: 'Incorrect password inserted for this user, please try again.',
                            isSuccess: false
                        });
                        sent = true
                    }
                }
                else
                {
                    if(!sent) {
                        res.status(200).json({message: 'Success to log in', isSuccess: true});
                        sent = true;
                    }
                    // todo: add some kind of session management and save the current logged in user.
                }
            }
        }).clone();
    }catch (error){
        if(!sent){
            res.status(400).send("Error occurred in login.");
            sent = true;
        }
    }
}

const getUserById = async (req,res) => {
    let sent = false;
    try{
        const {id} = req.params;
        await User.findById(id, function(error, docs){
            if(error || !docs){
                if(!sent){
                    res.status(404).send("User with id " + id + " not found");
                    sent = true;
                }
            }
            else {
                if(!sent) {
                    res.status(200).json(docs);
                    sent = true;
                }
            }
        }).clone();

    }catch(err) {
        if(!sent) {
            res.status(404).json({error: err.message});
            sent = true;
        }
    }
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const createUser = async (req,res) => {
    let sent = false;
    try {
        let result = {firstName: req.body.firstName,lastName: req.body.lastName, email: req.body.email, password:req.body.password};
        if(!result.firstName || !result.lastName || !result.email || !result.password) {
            res.status(404).json({message: "Information missing for user creation."});
            sent = true;
        }

        else if(!validateEmail(result.email)){
            if(!sent) {
                res.status(400).json({message: "Wrong email format."});
                sent = true;
            }
        }

        else if(!(/^[a-zA-Z]+$/.test(result.firstName)) || !(/^[a-zA-Z]+$/.test(result.lastName))){
            if(!sent) {
                res.status(400).json({message: "User name can contain english letters only."});
                sent = true;
            }
        }

        else await User.findOne({email:result.email}, function(error, docs){
            if(error && !sent) {
                res.status(400).send("Error with user creation");
                sent = true;
            }
            else if(docs && !sent){
                res.status(404).send("User with email " + result.email + " already exists");
                sent = true;
            }
        }).clone();
        const user = new User({firstName:result.firstName, lastName:result.lastName, email:result.email, password:result.password});
        await user.save();
        if(!sent) {
            res.status(200).json(user);
            sent = true;
        }
    } catch (error) {
        if(!sent) {
            res.status(404).json({message: error});
            sent = true;
        }
    }
}

const getMostActiveUsers = async (req, res) => {
    let sent = false;
    Post.aggregate(
        [
            {
                $group: {
                    _id: "$userEmail",
                    count: {"$sum": 1}
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ],

        async function (err, result) {
            console.log("Before getting user data:")
            console.log(result)
            if (err) {
                if (res && !sent) {
                    res.status(400).json({message: err});
                    sent = true;
                }
            } else {
                let updatedResult = []
                for(let i = 0; i < result.length; i++){
                    await User.findOne({email: result[i].id}, function(err, docs){
                        if (err && !sent){
                            res.status(400).json({message: err});
                            sent = true;
                        }
                        if (docs){
                            docs.numberOfPosts = result[i].count;
                            updatedResult.push(docs);
                        }
                    }).clone();
                }
                console.log("After getting user data:")
                console.log(updatedResult)
                if (res && !sent) {
                    res.status(200).json(updatedResult); // maybe not json? just send?
                    sent = true;
                }
            }
        }
    );
};

const getFriendsByUser = async(req, res) => {
    let sent = false;
    const {email} = req.params;
    let friends = null;
    await User.findOne({email:email}, function(error, docs){
        if(error || !docs) {
            res.status(400).send("No user exists with the email provided.");
            sent = true;
        }
        else friends = docs.friends;
    }).clone();

    await User.find({email: {$in: friends}}, function(error, docs){
        if((error || !docs) && !sent){
            res.status(400).send("No user exists with the email provided, or no friends for user.");
            sent = true;
        }
        else if (!sent) {
            res.status(200).json(docs);
            sent = true;
        }
    }).clone();
}

const addUserFriend = async(req, res) => {
    let sent = false;
    const {email} = req.params;
    let friends = null;
    await User.findOne({email:email}, function(error, docs){
        if(error || !docs) {
            res.status(400).send("No user exists with the email provided.");
            sent = true;
        }
        else friends = docs.friends;
    }).clone();
    let newFriend = req.body.friendEmail;
    if(!newFriend && !sent){
        res.status(400).send("No friend email provided.");
        sent = true;
    }
    await User.findOne({email:newFriend}, function(error, docs){
        if((error || !docs) && !sent) {
            res.status(400).send("No user exists with the friend email provided.");
            sent = true;
        }
    }).clone();

    friends.push(newFriend);
    await User.findOneAndUpdate({email: email}, {friends: friends}, function(error, docs){
        if((error || !docs) && !sent) {
            res.status(400).send("Error while updating user's friends");
            sent = true;
        }
        else if(!sent){
            res.status(200).send("Updated friend list successfully.");
            sent = true;
        }
    }).clone();
}

const deletePostFromUser = async (req) => {
    let succeeded = true;
    let allPostIDs = null;
    await User.findOne({email:req.email}, async function (error, docs) {
        if (error || !docs) {
            succeeded = false;
        } else allPostIDs = docs.allPostIDs;

        if (!succeeded)
            return false;
        let toRemove = req.postID;
        allPostIDs = allPostIDs.filter(e => e !== toRemove)
        await User.findOneAndUpdate({email: req.email}, {allPostIDs: allPostIDs}, {new: true}, function (error, docs) {
            if (error) succeeded = false;
            console.log("Posts after removal: " + docs.allPostIDs);
        }).clone();
    }).clone();

    return succeeded;
}

const AddPostToUser = async (req) => {
    let succeeded = true;
    let allPostIDs = null;
    await User.findOne({email:req.email}, async function (error, docs) {
        if (error || !docs) {
            succeeded = false;
        }
        allPostIDs = docs.allPostIDs;
        if(allPostIDs == null) allPostIDs = [];
        console.log(docs);
        if (!succeeded)
            return false;
        let newPostId = req.postID;
        allPostIDs.push(newPostId);

        await User.findOneAndUpdate({email: req.email}, {allPostIDs: allPostIDs}, {new: true}, function (error, docs) {
            if (error) succeeded = false;
            console.log("Posts after addition: " + docs.allPostIDs);
        }).clone();
    }).clone();

    return succeeded;
}

const updateUser = async (req,res) => {
    let sent = false;
    const {email} = req.params;
    const {firstName, lastName, password, profilePicture} = req.body;
    await User.findOne({email:email}, function(error, docs){
        if(error || !docs) {
            res.status(400).send("No user exists with the email provided.");
            sent = true;
        }
    }).clone();
    let updateInfo = {}
    if(firstName)
        updateInfo.firstName = firstName
    if(lastName)
        updateInfo.lastName = lastName
    if(password)
        updateInfo.password = password
    if(profilePicture)
        updateInfo.profilePicture = profilePicture

    await User.findOneAndUpdate({email: email}, updateInfo, function(error, result){
        if(error){
            if(!sent){
                res.status(400).send(error)
                sent = true;
            }

        }
    }).clone();
    if(!sent) {
        res.status(200).json("Updated successfully");
        sent = true;
    }
}


const readPostsByUser = async (req,res) =>{
    let sent = false;
    const {userEmail} = req.params
    await User.findOne({email: userEmail}, function(error, docs){
        if(error) {
            res.status(400).send("User with this email doesn't exist.");
            sent = true;
        }
    }).clone();
    await Post.find({userEmail: userEmail, isDeleted: false}, function(err, docs) {
        if (!req || !res){
            if(err)
                return null;
            return docs;
        }
        else if (err && !sent) {
            res.status(400).json({message: err});
            sent = true;
        }
        else if(docs && !sent) {
            res.status(200).json(docs);
            sent = true;
        }
        else return null;
    }).clone();
}

const deleteUser = async (req,res) => {
    let sent = false;
    const {email} = req.params;
    await User.findOneAndUpdate({email: email},{isDeleted: true}, function(error, result){
        if(error){
            res.status(400).send(error);
            sent = true;
        }
    }).clone();
    if(!sent)
        res.status(200).send("Deleted user successfully");
}

module.exports = {readUsers, createUser, updateUser, AddPostToUser,
                  deleteUser,getUserById, logIn, searchUsers, deletePostFromUser,
                  getMostActiveUsers, readPostsByUser, getFriendsByUser, addUserFriend};
