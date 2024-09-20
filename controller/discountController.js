const db = require('../models');

// Create a new discount
exports.createDiscount = async (req, res) => {
    const { discountValue, startDate, endDate } = req.body;
    const productId = req.params.id;
    try {
        const newDiscount = await db.discounts.create({
            discountValue,
            startDate,
            endDate,
            productId
        });
        res.status(201).json(newDiscount);
    } catch (error) {
        console.error('Error creating discount:', error);
        res.status(500).json({ error: 'Unable to create discount' });
    }
};

// Get all discounts with associated products
exports.getAllDiscounts = async (req, res) => {
    try {
        const discounts = await db.discounts.findAll({
            include: {
                model: db.products,
                as: 'product',
                attributes: ['name', 'description', 'price']
            }
        });

        res.status(200).json(discounts);
    } catch (error) {
        console.error('Error fetching discounts:', error);
        res.status(500).json({ error: 'Unable to fetch discounts' });
    }
};


// Get a single discount by ID with associated product
exports.getDiscountById = async (req, res) => {
    const id = req.params.id;
    try {
        const discount = await db.discounts.findByPk(id, {
            include: {
                model: db.products,  
                as: 'product',   
                attributes: ['name', 'description', 'price']
            }
        });

        if (!discount) {
            return res.status(404).json({ error: 'Discount not found' });
        }

        res.status(200).json(discount);
    } catch (error) {
        console.error('Error fetching discount:', error);
        res.status(500).json({ error: 'Unable to fetch discount' });
    }
};


// Update a discount
exports.updateDiscount = async (req, res) => {
    const id = req.params.id;
    const { discountValue, startDate, endDate, productId } = req.body;

    try {
        const discount = await db.discounts.findByPk(id);
        if (!discount) {
            return res.status(404).json({ error: 'Discount not found' });
        }

        // Only update fields that are provided in the request body
        await discount.update({
            discountValue: discountValue !== undefined ? discountValue : discount.discountValue,
            startDate: startDate !== undefined ? startDate : discount.startDate,
            endDate: endDate !== undefined ? endDate : discount.endDate,
            productId: productId !== undefined ? productId : discount.productId
        });

        res.status(200).json(discount);
    } catch (error) {
        console.error('Error updating discount:', error);
        res.status(500).json({ error: 'Unable to update discount' });
    }
};


// Delete a discount
exports.deleteDiscount = async (req, res) => {
    const id = req.params.id;
    try {
        const discount = await db.discounts.findByPk(id);
        if (!discount) {
            return res.status(404).json({ error: 'Discount not found' });
        }
        await discount.destroy();
        res.status(200).json({ message: 'Discount has been successfully deleted.' });
    } catch (error) {
        console.error('Error deleting discount:', error);
        res.status(500).json({ error: 'Unable to delete discount' });
    }
};

