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
        res.status(400).send(`400 - ${e.message}`);
    }
});

// get a user by id
router.get('/:userId', async (req, res) => {
    try{
        const users = await User.where('_id').equals(req.params.userId).populate('thoughts').populate('friends');
        res.status(200).json(users);
    } catch (e) {
        console.log(e);
        res.status(400).send(`400 - ${e.message}`);
    }
});

// Add a new user
router.post('/', async (req, res) => {
    try{
        const newUser = await User.create(req.body)
        res.status(201).json(newUser);
    } catch (e) {
        console.log(e);
        res.status(400).send(`400 - ${e.message}`);
    }
});

// update user
router.put('/:userId', async (req, res) => {
    try{
        const user = await User.where('_id').equals(req.params.userId);
        if (req.body.username) {user[0].username = req.body.username}
        if (req.body.email) {user[0].email = req.body.email}
        await user[0].save();
        res.status(201).json(user);
    } catch (e) {
        console.log(e);
        res.status(400).send(`400 - ${e.message}`);
    }
});

// delete user
router.delete('/:userId', async (req, res) => {
    try{
        const deletedUser = await User.deleteOne({ _id: req.params.userId })
        res.status(200).json(deletedUser);
    } catch (e) {
        console.log(e);
        res.status(400).send(`400 - ${e.message}`);
    }
});

// add friend to user
router.post('/:userId/friends/:friendId', async (req, res) => {
    try{
        const user = await User.where('_id').equals(req.params.userId);
        user[0].friends.push(req.params.friendId)
        await user[0].save();
        res.status(201).json(user);
    } catch (e) {
        console.log(e);
        res.status(400).send(`400 - ${e.message}`);
    }
});

// remove friend from user
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try{
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        res.status(201).json(user);
    } catch (e) {
        console.log(e);
        res.status(400).send(`400 - ${e.message}`);
    }
});

module.exports = router;