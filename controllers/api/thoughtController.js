const router = require('express').Router();
const { User, Thought } = require('../../models');

// get all thoughts
router.get('/', async (req, res) => {
    try{
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (e) {
        console.log(e);
    }
})

// get a thought by id
router.get('/:thoughtid', async (req, res) => {
    try{
        const thought = await User.where('_id').equals(req.params.thoughtid);
        res.status(200).json(thought);
    } catch (e) {
        console.log(e);
    }
});

// Add a new thought
router.post('/', async (req, res) => {
    try{
        const newThought = await Thought.create({ thoughtText: req.body.thoughtText, username: req.body.username });
        const usersThought = await User.where('_id').equals(req.body.userId);
        
        usersThought.thoughts.push(newThought._id);
        usersThought.save();

        res.status(201).json(newThought);
    } catch (e) {
        console.log(e);
    }
});

// update thought
router.put('/:userid', async (req, res) => {
    try{
        const thought = await Thought.where('_id').equals(req.params.thoughtid);
        if (req.body.username) {thought[0].username = req.body.username}
        if (req.body.thoughtText) {thought[0].thoughtText = req.body.thoughtText}
        await thought[0].save();
        res.status(201).json(thought);
    } catch (e) {
        console.log(e);
    }
});

// delete thought
router.delete('/:thoughtid', async (req, res) => {
    try{
        const deletedThought = await Thought.deleteOne({ _id: req.params.thoughtid })
        res.status(200).json(deletedThought);
    } catch (e) {
        console.log(e);
    }
});



module.exports = router;