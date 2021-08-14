const Orders = require("../models/order");

/**
 * @route   POST api/order/addOrder
 * @desc    POST add order
 * @access  Private
 */

 exports.addOrder = async (req, res) => {
    try {
        const user = req.user._id;
        const {total,order} = req.body;
        // console.log(total,order)
        if(!total || order.length == 0){
            let err = new Error("Add Some Items");
            return res.status(400).json({
                message: err.message,
              });
        }
        const orders = new Orders({total,order,user});
        orders.save()
        .then(savedOrder => {
            return res.status(200).json({
                message:`Order Saved id:${savedOrder._id}, ${savedOrder}`
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
 * @route   POST api/order/editOrder
 * @desc    POST edit order
 * @access  Private
 */

 exports.editOrder = async (req, res) => {
    try {
        const user = req.user._id;
        const {total,order,_id} = req.body;
        if(!total || order.length == 0 || !_id){
            let err = new Error("Add Some Items");
            return res.status(400).json({
                message: err.message,
              });
        }
        const orders = await Orders.findById(_id);
        if(!orders) throw Error('Order Does not exist');

        orders.total = total;
        orders.order = order;
        orders.user = user;

        const savedOrder = await orders.save();
        console.log(savedOrder)
        if(!savedOrder) throw Error('Something went wrong');
        return res.status(200).json({
            item:savedOrder.item,
            quantity:savedOrder.quantity,
            _id:savedOrder._id
        })
    }catch (error) {
        console.log(error);
        return res.status(400).json({
            error:error.message
        })
    }
};

/**
 * @route   POST api/order/getOrder
 * @desc    POST get order
 * @access  Private
 */

 exports.getOrder = async (req, res) => {
    try {
        const user = req.user._id;
        if(!user){
            let err = new Error("Add Some Items");
            return res.status(400).json({
                message: err.message,
              });
        }
        const orders = await Orders.find({user}).sort({'updatedAt':-1});
        if(!orders) throw Error('Something went wrong');
        return res.status(200).json({
            message:`Number of Items ${orders.length}`,
            orders
        })
    }catch (error) {
        console.log(error);
        return res.status(400).json({
            error:`error occured ${error}`
        })
    }
};

/**
 * @route   POST api/order/deleteOrder
 * @desc    POST delete order
 * @access  Private
 */

 exports.deleteOrder = async (req, res) => {
    try {
        const {_id} = req.body;

        if(!_id){
            let err = new Error("Add Some Items");
            return res.status(400).json({
                message: err.message,
              });
        }
        const order = await Orders.findById(_id);
        if(!order) throw Error('Order Does not exist');
        const savedOrder = await order.remove();
        if(!savedOrder) throw Error('Something went wrong');
        return res.status(200).json({
            message:`Order ${_id} is deleted Successfully`
        })
    }catch (error) {
        console.log(error);
        return res.status(400).json({
            error:`error occured ${error}`
        })
    }
};