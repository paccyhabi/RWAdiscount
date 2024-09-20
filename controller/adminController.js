const db = require('../models');

// Create a new category
exports.createCategory = async (req, res) => {
    const { name} = req.body;

    try {
        const newCategory = await db.categories.create({ name});
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Unable to create category' });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await db.categories.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Unable to fetch categories' });
    }
};
