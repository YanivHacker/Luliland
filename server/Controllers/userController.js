const mongoose = require('mongoose');
const User = require('../Models/User')

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

const logIn = async (req,res) => {
    try {
        if(!await User.findOne({email: req.body.email}, function (err, docs) {
            if (err){
                alert('No user found with this email.')
                res.status(404).json(user);
            }
            else{
                if(req.body.password !== docs.password){
                    alert('Incorrect password inserted for this user, please try again.')
                    res.status(400).json(user);
                }
                else
                {
                    alert('Login successful!')
                    res.status(200).json(user)
                    // todo: add some kind of session management and save the current logged in user.
                }
            }
        })){
            alert('No user found with this email.')
            res.status(404).json(user);
        }
        res.status(404).json(user);
    } catch (error) {
        res.status(404).json({ message:error });
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

const updateUser = async (req,res) => {
    const {id} = req.params;
    const {firstName, lastName, password, profilePicture} = req.body;
    if(!mongoose.isValidObjectId(id))
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
    if(!mongoose.isValidObjectId(id))
        return res.status(404).send(`the id ${id} is not valid`);
    const user = await User.findByIdAndUpdate(id,{isDeleted: true});
    res.json(user);
}

module.exports = {readUsers, createUser, updateUser, deleteUser,getUserById, logIn};
