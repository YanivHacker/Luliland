const mongoose = require('mongoose');
const User = require('../Models/User')

const readUsers = async (req,res) =>{
    try {
        const users = User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}
const createUser = async (req,res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message:error });
    }
}
const updateUser = async (req,res) => {
    const {id} = req.params;
    const {firstName, lastName, creationDate, isAdmin, allPostIDs, email, password, profilePicture, isDeleted} = req.body;
    if(!mongoose.isValidObjectId(id))
        return res.status(404).send(`the id ${id} is not valid`);
    const user = {_id:id, firstName, lastName, creationDate, isAdmin, allPostIDs, email, password, profilePicture, isDeleted};
    await User.findByIdAndUpdate(user);
    res.json(user);
}
const deleteUser = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.isValidObjectId(id))
        return res.status(404).send(`the id ${id} is not valid`);
    const user = await User.findByIdAndUpdate(id,{isDeleted: true});
    res.json(user);
}

module.exports = {readUsers, createUser, updateUser, deleteUser};
