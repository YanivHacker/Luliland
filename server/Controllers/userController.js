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
            return res.status(404).send(`the id ${id} is not valid`);
        const user = await User.findOne({_id:id});
        res.status(200).json(user);

    }catch(err) {
        res.status(404).json({error: err.message});
    }
}

const validateFields = (admin, fullName, emailAddress) => {
    var firstName = null;
    var lastName = null;
    var email = null;
    var isAdmin = null;
    if(!admin){
        alert('No administrative information provided.');
        res.status(400).json(user);
    }
    else {
        isAdmin = admin;
    }
    if(req.body.fullName && req.body.fullName.length > 0){
        var regName = '/^[a-zA-Z]+ [a-zA-Z]+$/';
        if(!regName.test(req.body.fullName)){
            alert('Invalid name given.');
            res.status(400).json(user);
        }else{
            names = req.body.fullName.split(' ', 1);
            firstName = names[0];
            lastName = names[1];
        }
    }
    else{
        alert('No name given.');
        res.status(400).json(user);
    }
    
    if(emailAddress && emailAddress.length > 0){
        var regName = '/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/';
        if(!regName.test(emailAddress)){
            alert('Invalid email format given.');
            res.status(400).json(user);
        }else{
            email = req.body.email;
        }
    }
    return {firstName, lastName, email, isAdmin};
}

const createUser = async (req,res) => {
    try {
        //var creationDate = Date.now();
        /*if(await User.findOne({email: req.body.email})){
            alert('User with this email address already exiSts. Please choose another email.')
            res.status(400).json(user);
        }*/
        var result = {firstName: req.body.firstName,lastName: req.body.lastName, email: req.body.email, password:req.body.password};
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
    const {id} = req.params;
    const {firstName, lastName, password, profilePicture} = req.body;
    if(!User.isValidObjectId(id))
        return res.status(404).send(`the id ${id} is not valid`);
    var result = {firstName: firstName, lastName: lastName};
    if(profilePicture)
        await User.findByIdAndUpdate(id, {firstName:result.firstName, lastName:result.lastName, password:password, profilePicture:profilePicture});
    else
        await User.findByIdAndUpdate(id, {firstName:result.firstName, lastName:result.lastName,password:password});
    res.json(user);
}
// TODO: ASK SHAY IF WE NEED TO TAKE CARE OF ENDPOINTS NOT ACCESSED THROUGH UI
const deleteUser = async (req,res) => {
    const {id} = req.params;
    if(!User.isValidObjectId(id))
        return res.status(404).send(`the id ${id} is not valid`);
    const user = await User.findByIdAndUpdate(id,{isDeleted: true});
    res.json(user);
}

module.exports = {readUsers, createUser, updateUser, deleteUser,getUserById, logIn, searchUsers, getMostActiveUsers};
