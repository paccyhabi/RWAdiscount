const db = require('../models')
const { Op } = require('sequelize');

exports.getAllProductsWithDetails = async (req, res) => {
    try {
        const products = await db.products.findAll({
            include: [
                {
                    model: db.categories,
                    as: 'category',
                    attributes: ['id', 'name']
                },
                {
                    model: db.discounts,
                    as: 'discounts', 
                    attributes: ['id', 'discountValue', 'startDate', 'endDate'] 
                }
            ]
        });


        if (!products.length) {
            return res.status(404).json({ message: 'No products found.' });
        }


        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products with details:', error);
        res.status(500).json({ error: 'Unable to fetch products with details' });
    }
};



exports.getProductsByCategoryName = async (req, res) => {
    const name = req.params.categoryName;

    try {
        const category = await db.categories.findOne({
            where: { name },
            attributes: ['id'] 
        });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const products = await db.products.findAll({
            where: { categoryId: category.id },
            include: [
                {
                    model: db.categories,
                    as: 'category',
                    attributes: ['id', 'name'] 
                },
                {
                    model: db.discounts, 
                    as: 'discounts',
                    attributes: ['id', 'discountValue', 'startDate', 'endDate'] 
                }
            ]
        });

        if (!products.length) {
            return res.status(404).json({ message: 'No products found for this category.' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products by category name:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ error: 'Unable to fetch products by category name' });
    }
};


exports.searchProducts = async (req, res) => {
    const { name, description, minPrice, maxPrice, categoryName } = req.query;

    try {
        const searchCriteria = {};

        if (name) {
            searchCriteria.name = { [Op.iLike]: `%${name}%` };
        }

        if (description) {
            searchCriteria.description = { [Op.iLike]: `%${description}%` };
        }

        if (minPrice || maxPrice) {
            searchCriteria.price = {};
            if (minPrice) {
                searchCriteria.price[Op.gte] = minPrice; 
            }
            if (maxPrice) {
                searchCriteria.price[Op.lte] = maxPrice; 
            }
        }

        let categoryId;
        if (categoryName) {
            const category = await db.categories.findOne({
                where: { name },
                attributes: ['id']
            });

            if (category) {
                categoryId = category.id;
            } else {
                return res.status(404).json({ message: 'Category not found' });
            }
        }


        const products = await db.products.findAll({
            where: {
                ...searchCriteria,
                ...(categoryId && { categoryId }) 
            },
            include: [
                {
                    model: db.categories, 
                    as: 'category',
                    attributes: ['id', 'name'] 
                },
                {
                    model: db.discounts,
                    as: 'discounts',
                    attributes: ['id', 'discountValue', 'startDate', 'endDate'] 
                }
            ]
        });

        if (!products.length) {
            return res.status(404).json({ message: 'No products found matching the criteria.' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Error searching products:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ error: 'Unable to search products' });
    }
};

