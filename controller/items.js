const Items = require("../models/items");

/**
 * @route   POST api/item/addItem
 * @desc    POST add item
 * @access  Private
 */

 exports.addItem = async (req, res) => {
    try {
        const user = req.user._id;
        const {item,amount} = req.body;
        if(!item || !amount){
            let err = new Error("Add Some Items");
            return res.status(400).json({
                message: err.message,
              });
        }
        const itemDB = await Items.find({item:item.toLowerCase(),user});
        console.log(itemDB)
        if(itemDB.length > 0) throw new Error('item already exists');
        const transaction = new Items({item:item.toLowerCase(),amount,user});
        transaction.save()
        .then(savedItem => {
            return res.status(200).json({
                message:`item Saved id:${savedItem._id}, ${savedItem}`
            })
        })
    }catch (error) {
        console.log(error.message);
        return res.status(400).send({message:error.message})
    }
};

/**
 * @route   POST api/item/editItem
 * @desc    POST edit item
 * @access  Private
 */

 exports.editItem = async (req, res) => {
    try {
        const user = req.user._id;
        const {item,amount,_id} = req.body;
        if(!item || !amount || !_id){
            let err = new Error("Add Some Items");
            return res.status(400).json({
                message: err.message,
              });
        }
        const selectedItem = await Items.findById(_id);
        if(!selectedItem) throw Error('selectedItem Does not exist');

        selectedItem.item = item.toLowerCase();
        selectedItem.amount = amount;
        selectedItem.user = user;

        const savedItem = await selectedItem.save();
        if(!savedItem) throw Error('Something went wrong');
        return res.status(200).json({
            item:savedItem.item,
            amount:savedItem.amount,
            _id:savedItem._id
        })
    }catch (error) {
        console.log(error);
        return res.status(400).json({
            message:error.message
        })
    }
};

/**
 * @route   POST api/item/getItem
 * @desc    POST get item
 * @access  Private
 */

 exports.getItem = async (req, res) => {
    try {
        const user = req.user._id;
        if(!user){
            let err = new Error("Add Some Items");
            return res.status(400).json({
                message: err.message,
              });
        }
        const item = await Items.find({user});
        // if(item.length == 0) throw Error('Please add some item..');
        return res.status(200).json({
            message:`Number of Items ${item.length}`,
            item
        })
    }catch (error) {
        console.log(error);
        return res.status(400).json({
            message:error.message
        })
    }
};

/**
 * @route   POST api/item/deleteItem
 * @desc    POST delete item
 * @access  Private
 */

 exports.deleteItem = async (req, res) => {
    try {
        const {_id} = req.body;

        if(!_id){
            let err = new Error("Add Some Items");
            return res.status(400).json({
                message: err.message,
              });
        }
        const item = await Items.findById(_id);
        if(!item) throw Error('item Does not exist');
        const savedTransaction = await item.remove();
        if(!savedTransaction) throw Error('Something went wrong');
        return res.status(200).json({
            message:`item ${_id} is deleted Successfully`
        })
    }catch (error) {
        console.log(error);
        return res.status(400).json({
            message:error.message
        })
    }
};