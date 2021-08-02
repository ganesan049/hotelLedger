const Transactions = require("../models/transaction");

/**
 * @route   POST api/transaction/addTransaction
 * @desc    POST add transaction
 * @access  Private
 */

 exports.addTransaction = async (req, res) => {
    try {
        console.log("Executed...")
        const user = req.user._id;
        const {item,amount} = req.body;

        if(!item || !amount){
            let err = new Error("Add Some Items");
            return res.status(400).json({
                message: err.message,
              });
        }
        const transactions = new Transactions({item,amount,user});
        transactions.save()
        .then(savedTransaction => {
            console.log(savedTransaction);
            return res.status(200).json({
                message:`transaction Saved id:${savedTransaction._id}, ${savedTransaction}`
            })
        })
    }catch (error) {
        console.log(error);
        return res.status(400).json({
            error:`error occured ${error}`
        })
    }
};

/**
 * @route   POST api/transaction/editTransaction
 * @desc    POST edit transaction
 * @access  Private
 */

 exports.editTransaction = async (req, res) => {
    try {
        const user = req.user._id;
        const {item,amount,_id} = req.body;
        console.log(user,item,amount,_id)
        if(!item || !amount || !_id){
            let err = new Error("Add Some Items");
            return res.status(400).json({
                message: err.message,
              });
        }
        const transaction = await Transactions.findById(_id);
        if(!transaction) throw Error('transaction Does not exist');

        transaction.item = item;
        transaction.amount = amount;
        transaction.user = user;

        const savedTransaction = await transaction.save();
        console.log(savedTransaction)
        if(!savedTransaction) throw Error('Something went wrong');
        return res.status(200).json({
            item:savedTransaction.item,
            amount:savedTransaction.amount,
            _id:savedTransaction._id
        })
    }catch (error) {
        console.log(error);
        return res.status(400).json({
            error:error.message
        })
    }
};

/**
 * @route   POST api/transaction/getTransaction
 * @desc    POST get transaction
 * @access  Private
 */

 exports.getTransaction = async (req, res) => {
    try {
        const user = req.user._id;
        if(!user){
            let err = new Error("Add Some Items");
            return res.status(400).json({
                message: err.message,
              });
        }
        const transactions = await Transactions.find({user});
        if(!transactions) throw Error('Something went wrong');
        return res.status(200).json({
            message:`Number of Items ${transactions.length}`,
            transactions
        })
    }catch (error) {
        console.log(error);
        return res.status(400).json({
            error:`error occured ${error}`
        })
    }
};

/**
 * @route   POST api/transaction/deleteTransaction
 * @desc    POST delete transaction
 * @access  Private
 */

 exports.deleteTransaction = async (req, res) => {
    try {
        const {_id} = req.body;

        if(!_id){
            let err = new Error("Add Some Items");
            return res.status(400).json({
                message: err.message,
              });
        }
        const transaction = await Transactions.findById(_id);
        if(!transaction) throw Error('transaction Does not exist');
        const savedTransaction = await transaction.remove();
        if(!savedTransaction) throw Error('Something went wrong');
        return res.status(200).json({
            message:`transaction ${_id} is deleted Successfully`
        })
    }catch (error) {
        console.log(error);
        return res.status(400).json({
            error:`error occured ${error}`
        })
    }
};