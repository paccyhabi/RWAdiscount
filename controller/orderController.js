const db = require('../models');
exports.createOrder = async (req, res) => {
    const { quantity, totalPrice,userId } = req.body;
    const productId = req.params.productId;
    try {
        const user = await db.users.findByPk(userId);
        const product = await db.products.findByPk(productId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Create the order
        const newOrder = await db.orders.create({
            quantity,
            totalPrice,
            userId,
            productId
        });

        res.status(201).json({
            message: 'Order created successfully',
            order: newOrder
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Unable to create order' });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await db.orders.findAll({
            include: [
                { model: db.products, as: 'product' },
                { model: db.users, as: 'user' }
            ]
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Unable to fetch orders' });
    }
};


exports.getUserOrders = async (req, res) => {
    const userId = req.params.id;
    try {
        const orders = await db.orders.findAll({
            where: { userId },
            include: [
                { model: db.products, as: 'product' }
            ]
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Unable to fetch orders' });
    }
};


// Get all orders by business
exports.getBusinessOrders = async (req, res) => {
    const userId = req.params.id; // Assuming user ID is set in req.user after authentication

    try {
        const orders = await db.orders.findAll({
            include: [
                {
                    model: db.products,
                    as: 'product',
                    where: { userId: userId } // Filter products by the userId
                },
                { model: db.users, as: 'user' }
            ],
            where: {
                productId: { [db.Sequelize.Op.ne]: null } // Ensuring productId is valid
            }
        });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Unable to fetch orders' });
    }
};



// Update an order status
exports.updateOrderStatus = async (req, res) => {
    const id = req.params.orderId;
    const { orderStatus } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'Order ID is required' });
    }
    if (!orderStatus) {
        return res.status(400).json({ error: 'Order status is required' });
    }

    try {
        // Find the order by its ID
        const order = await db.orders.findByPk(id);
        
        // If the order doesn't exist, return a 404 error
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Update the order status
        await order.update({ orderStatus });
        
        // Return success response with updated order
        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        // Log error and return 500 response if something goes wrong
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Unable to update order' });
    }
};


