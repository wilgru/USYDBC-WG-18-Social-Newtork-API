// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../../models');
const router = require('express').Router();

// get all users
router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) {
        console.log(e);
    }
});

// get a user by id
router.get('/:userid', async (req, res) => {
    try{
        const users = await User.where('_id').equals(req.params.userid).populate('friends');
        res.status(200).json(users);
    } catch (e) {
        console.log(e);
    }
});

// Add a new user
router.post('/', async (req, res) => {
    try{
        const newUser = await User.create(req.body)
        res.status(201).json(newUser);
    } catch (e) {
        console.log(e);
    }
});

// update user
router.put('/:userid', async (req, res) => {
    try{
        const user = await User.where('_id').equals(req.params.userid);
        if (req.body.username) {user[0].username = req.body.username}
        if (req.body.email) {user[0].email = req.body.email}
        await user[0].save();
        res.status(201).json(user);
    } catch (e) {
        console.log(e);
    }
});

// delete user
router.delete('/:userid', async (req, res) => {
    try{
        const deletedUser = await User.deleteOne({ _id: req.params.userid })
        res.status(200).json(deletedUser);
    } catch (e) {
        console.log(e);
    }
});

// add friend to user
router.post('/:userid/friends/:friendId', async (req, res) => {
    try{
        const user = await User.where('_id').equals(req.params.userid);
        user[0].friends.push(req.params.friendId)
        await user[0].save();
        res.status(201).json(user);
    } catch (e) {
        console.log(e);
    }
});

// remove friend from user
router.delete('/:userid/friends/:friendId', async (req, res) => {
    try{
        const user = await User.findOneAndUpdate(
            { _id: req.params.userid },
            { $pull: { friends: { _id: req.params.friendId } } },
            { runValidators: true, new: true }
        );
        res.status(201).json(user);
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;