const mongoose = require('mongoose');
const User = require('../Models/User');
const Post = require('../Models/Post');

const readUsers = async (req,res) =>{
    try {
        const users = await User.find();
        if(res) {
            res.status(200).json(users);
        }
        else return users;
    } catch (err) {
        if(res) {
            res.status(404).json({error: err.message});
        }
    }
    return null;
}

const searchUsers = async (req, res) => {
    try {
        let users = null
        let method = req.body.searchBy
        let content = req.body.keyword
        if(!content){
            res.status(400).json({error: 'No keywords entered for search query,or no search method selected'});
        }
        else if(!content.includes(' ')) {
            const regex = new RegExp(content, 'i') // i for case insensitive
            if(!method)
                users = await User.find({$or: [{firstName: {$regex: regex}}, {lastName: {$regex: regex}}]})
            else{
                if(method === 'firstName')
                    users = await User.find({firstName: {$regex: regex}});
                else if (method === 'lastName')
                    users = await User.find({lastName: {$regex: regex}});
                else res.status(400).json({error: 'Invalid filter clause'});
            }
        }
        else
        {
            let values = content.split(' ', 1);
            const firstNameRegex = new RegExp(values[0], 'i') // i for case insensitive
            const lastNameRegex = new RegExp(values[1], 'i') // i for case insensitive
            users = await User.find({$and: [{firstName: {$regex: firstNameRegex}}, {lastName: {$regex: lastNameRegex}}]})
        }
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).json({error: err});
    }
}

const logIn = async (req,res) => {
    try{
        await User.findOne({email: req.body.email}, function (err, docs) {
            if (err || !docs){
                res.status(404).json({message:'No user found with this email.', isSuccess:false});
            }
            else{
                console.log(docs)
                if(req.body.password !== docs.password){
                    res.status(400).json({message:'Incorrect password inserted for this user, please try again.', isSuccess:false});
                }
                else
                {
                    res.status(200).json({message:'Success to log in', isSuccess:true})
                    // todo: add some kind of session management and save the current logged in user.
                }
            }
        })
    }catch (error){
        
    }
}

const getUserById = async (req,res) => {
    try{
        const {id} = req.params;
        if(!mongoose.isValidObjectId(id))
            return res.status(404).send("the id ${id} is not valid");
        await User.findOne({_id:id}, function(error, docs){
            if(error || !docs){
                res.status(404).send("User with id " + id + " not found");
            }
            else res.status(200).json(docs);
        });

    }catch(err) {
        res.status(404).json({error: err.message});
    }
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const createUser = async (req,res) => {
    try {
        let result = {firstName: req.body.firstName,lastName: req.body.lastName, email: req.body.email, password:req.body.password};
        if(!result.firstName || !result.lastName || !result.email || !result.password) {
            res.status(404).json({message: "Information missing for user creation."});
        }

        else if(!validateEmail(result.email)){
            res.status(400).json({message: "Wrong email format."});
        }

        else if(!(/^[a-zA-Z]+$/.test(result.firstName)) || !(/^[a-zA-Z]+$/.test(result.lastName))){
            res.status(400).json({message: "User name can contain english letters only."});
        }

        else await User.findOne({email:result.email}, function(error, docs){
            if(error)
                res.status(400).send("Error with user creation");
            else if(docs){
                res.status(404).send("User with email " + result.email + " already exists");
            }
        });
        const user = new User({firstName:result.firstName, lastName:result.lastName, email:result.email, password:result.password});
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message:error });
    }
}

const getMostActiveUsers = async (req, res) => {
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
                if (res)
                    res.status(400).json({message: err});
            } else {
                let updatedResult = []
                for(let i = 0; i < result.length; i++){
                    await User.findOne({email: result[i]._id}, function(err, docs){
                        if (err){
                            res.status(400).json({message: err});
                        }
                        if (docs){
                            docs.numberOfPosts = result[i].count;
                            updatedResult.push(docs);
                        }
                    });
                }
                console.log("After getting user data:")
                console.log(updatedResult)
                if (res) {
                    res.status(200).json(updatedResult); // maybe not json? just send?
                }
            }
        }
    );
};

const updateUser = async (req,res) => {
    const {email} = req.params;
    const {firstName, lastName, password, profilePicture} = req.body;
    await User.findOne({email:email}, function(error, docs){
        if(error || !docs)
            res.status(400).send("No user exists with the email provided.");
    });
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
            res.status(400).send(error)
        }
    });
    res.status(200).json("Updated successfully");
}


const readPostsByUser = async (req,res) =>{
    const {userEmail} = req.params
    await User.findOne({email: userEmail}, function(error, docs){
        if(error)
            res.status(400).send("User with this email doesn't exist.");
    })
    await Post.find({userEmail: userEmail, isDeleted: false}, function(err, docs) {
        if (!req || !res){
            if(err)
                return null;
            return docs;
        }
        else if (err)
            res.status(400).json({message: err});
        else if(docs) {
            res.status(200).json(docs);
        }
        else return null;
    });
}

const deleteUser = async (req,res) => {
    const {email} = req.params;
    await User.findOneAndUpdate({email: email},{isDeleted: true}, function(error, result){
        if(error){
            res.status(400).send(error);
        }
    });
    res.status(200).send("Deleted user successfully");
}

module.exports = {readUsers, createUser, updateUser, deleteUser,getUserById, logIn, searchUsers, getMostActiveUsers, readPostsByUser};
