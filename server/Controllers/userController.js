const mongoose = require('mongoose');
const User = require('../Models/User')

const readUsers = async (req,res) =>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({error: err.message});
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
        var creationDate = Date.now();
        if(await mongoose.findOne({email: req.body.email})){
            alert('User with this email address already exiSts. Please choose another email.')
            res.status(400).json(user);
        }
        var result = validateFields(req.body.isAdmin, req.body.fullName, req.body.email);
        const user = new User(result.firstName, result.lastName, result.email, creationDate, result.isAdmin, req.body.profilePicture);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message:error });
    }
}

const updateUser = async (req,res) => {
    const {id} = req.params;
    const {fullName, isAdmin, password, profilePicture} = req.body;
    if(!mongoose.isValidObjectId(id))
        return res.status(404).send(`the id ${id} is not valid`);
    var result = validateFields(isAdmin, fullName, null);
    if(profilePicture)
        await User.findByIdAndUpdate(id, {firstName:result.firstName, lastName:result.lastName, isAdmin:result.isAdmin, password:password, profilePicture:profilePicture});
    else
        await User.findByIdAndUpdate(id, {firstName:result.firstName, lastName:result.lastName, isAdmin:result.isAdmin, password:password});
    res.json(user);
}
// TODO: ASK SHAY IF WE NEED TO TAKE CARE OF ENDPOINTS NOT ACCESSED THROUGH UI
const deleteUser = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.isValidObjectId(id))
        return res.status(404).send(`the id ${id} is not valid`);
    const user = await User.findByIdAndUpdate(id,{isDeleted: true});
    res.json(user);
}

module.exports = {readUsers, createUser, updateUser, deleteUser,getUserById};
