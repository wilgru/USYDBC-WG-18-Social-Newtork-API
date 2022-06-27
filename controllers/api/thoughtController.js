const router = require('express').Router();
const { User, Thought } = require('../../models');

// get all thoughts
router.get('/', async (req, res) => {
    try{
        const thoughts = await Thought.find().populate('reactions');
        res.status(200).json(thoughts);
    } catch (e) {
        console.log(e)
        res.status(400).send(`400 - ${e.message}`);
    }
})

// get a thought by id
router.get('/:thoughtId', async (req, res) => {
    try{
        const thought = await Thought.where('_id').equals(req.params.thoughtId).populate('reactions');

        res.status(200).json(thought);

    } catch (e) {
        console.log(e)
        res.status(400).send(`400 - ${e.message}`);
    }
});

// Add a new thought
router.post('/', async (req, res) => {
    try{
        const newThought = await Thought.create({ thoughtText: req.body.thoughtText, username: req.body.username });
        const usersThought = await User.where('_id').equals(req.body.userId);
        
        console.log(usersThought[0])
        usersThought[0].thoughts.push(newThought._id);
        usersThought[0].save();

        res.status(201).json(newThought);
    } catch (e) {
        console.log(e)
        res.status(400).send(`400 - ${e.message}`);
    }
});

// update thought
router.put('/:thoughtId', async (req, res) => {
    try{
        const thought = await Thought.where('_id').equals(req.params.thoughtId);

        console.log(thought, thought[0])

        if (req.body.thoughtText) {thought[0].thoughtText = req.body.thoughtText}
        if (req.body.username) {thought[0].username = req.body.username}
        await thought[0].save();

        res.status(201).json(thought);
    } catch (e) {
        console.log(e)
        res.status(400).send(`400 - ${e.message}`);
    }
});

// delete thought
router.delete('/:thoughtId', async (req, res) => {
    try{
        const deletedThought = await Thought.deleteOne({ _id: req.params.thoughtId })
        res.status(200).json(deletedThought);
    } catch (e) {
        console.log(e)
        res.status(400).send(`400 - ${e.message}`);
    }
});

// add new reaction
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        );

        // alternative approach
        // const thought = await Thought.where('_id').equals(req.params.thoughtId);
        // thought[0].reactions.push(req.body);
        // thought[0].save();

        res.status(201).json(thought);
    } catch (e) {
        console.log(e)
        res.status(400).send(`400 - ${e.message}`);
    }
});

// delete reaction
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionId } },
            { runValidators: true, new: true }
        );

        // alternative approach
        // const thought = await Thought.where('_id').equals(req.params.thoughtId);
        // thought[0].reactions = thought[0].reactions.filter(
        //     (reaction) => { 
        //         if (reaction.reactionId != req.params.reactionId) { return reaction } 
        //     });
        // thought[0].save();

        res.status(200).json(thought);

    } catch (e) {
        console.log(e.message)
        res.status(400).send(`400 - ${e.message}`);
    }
})

module.exports = router;