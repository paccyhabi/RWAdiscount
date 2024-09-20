const db = require('../models');

// Create a new review
exports.createReview = async (req, res) => {
    const { rating, reviewText, userId  } = req.body;
    const productId = req.params.productId;
    try {
        const newReview = await db.reviews.create({
            rating,
            reviewText,
            productId,
            userId
        });
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Unable to create review' });
    }
};

// Get reviews by product
exports.getReviewsByProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const reviews = await db.reviews.findAll({
            where: { productId },
        });

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews for product:', error);
        res.status(500).json({ error: 'Unable to fetch reviews' });
    }
};
