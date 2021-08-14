const Expenses = require("../models/expense");

/**
 * @route   POST api/expense/addExpense
 * @desc    POST add expense
 * @access  Private
 */

let addAllExpenses = function (expenses,user) {
    const a = [];

    for (let i = 0; i < expenses.length; i++) {
        const {total,item} = expenses[i];
        a.push(new Promise((resolve, reject) => {
            const savedExpense = new Expenses({total,item,user});
            savedExpense
            .save()
            .then(resolve)
            .catch(reject)
        }));
    }

    return Promise.all(a);
};

 exports.addExpense = async (req, res) => {
    try {
        const user = req.user._id;
        const expenses = req.body;

        if(expenses.length == 0){
            let err = new Error("Add Some Expenses");
            return res.status(400).json({
                message: err.message,
              });
        }

        await addAllExpenses(expenses,user)
        .then(data => res.send({message:`${data.length} Items saved successfully`}))
        .catch(err => res.status(400).send({message:err}))
    }catch (error) {
        console.log(error);
        return res.status(400).json({
            error:`error occured ${error}`
        })
    }
};

/**
 * @route   POST api/expense/editExpense
 * @desc    POST edit expense
 * @access  Private
 */

 exports.editExpense = async (req, res) => {
    try {
        const user = req.user._id;
        const {total,expense,_id} = req.body;
        if(!total || expense.length == 0 || !_id){
            let err = new Error("Add Some Items");
            return res.status(400).json({
                message: err.message,
              });
        }
        const expenses = await Expenses.findById(_id);
        if(!expenses) throw Error('expense Does not exist');

        expenses.total = total;
        expenses.expense = expense;
        expenses.user = user;

        const savedexpense = await Expenses.save();
        console.log(savedexpense)
        if(!savedexpense) throw Error('Something went wrong');
        return res.status(200).json({
            item:savedexpense.item,
            quantity:savedexpense.quantity,
            _id:savedexpense._id
        })
    }catch (error) {
        console.log(error);
        return res.status(400).json({
            error:error.message
        })
    }
};

/**
 * @route   POST api/expense/getExpense
 * @desc    POST get expense
 * @access  Private
 */

 exports.getExpense = async (req, res) => {
    try {
        const user = req.user._id;
        if(!user){
            let err = new Error("Add Some Items");
            return res.status(400).json({
                message: err.message,
              });
        }
        const expenses = await Expenses.find({user}).sort({'updatedAt':-1});
        if(!expenses) throw Error('Something went wrong');
        return res.status(200).json({
            message:`Number of Items ${expenses.length}`,
            expenses
        })
    }catch (error) {
        console.log(error);
        return res.status(400).json({
            error:`error occured ${error}`
        })
    }
};

/**
 * @route   POST api/expense/deleteExpense
 * @desc    POST delete expense
 * @access  Private
 */

 exports.deleteExpense = async (req, res) => {
    try {
        const {_id} = req.body;

        if(!_id){
            let err = new Error("Add Some Items");
            return res.status(400).json({
                message: err.message,
              });
        }
        const expense = await Expenses.findById(_id);
        if(!expense) throw Error('expense Does not exist');
        const savedexpense = await expense.remove();
        if(!savedexpense) throw Error('Something went wrong');
        return res.status(200).json({
            message:`expense ${_id} is deleted Successfully`
        })
    }catch (error) {
        console.log(error);
        return res.status(400).json({
            error:`error occured ${error}`
        })
    }
};