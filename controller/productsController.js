const multer = require('multer');
const path = require('path');
const db = require('../models');

// Set up storage for multer
const storage = multer.diskStorage({
  destination: '../uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },  // 1 MB file size limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('image');

// Function to check valid file types
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await db.products.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch products' });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await db.products.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch product' });
    }
};

// Create a new product
exports.createProduct = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).send(`Error: ${err}`);
        }

        if (!req.file) {
            return res.status(400).send('Error: No File Selected');
        }

        const { name, description, price, details,categoryId } = req.body;
        const userId = req.params.id;
        const imageUrl = req.file.filename;

        try {
            const newProduct = await db.products.create({
                name,
                description,
                price,
                imageUrl,
                details,
                userId,
                categoryId
            });
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Unable to create product' });
        }
    });
};

exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;  // Capture only the provided fields in the request body

    try {
        const product = await db.products.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update only fields that are present in the request body
        await product.update(updateData);

        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Unable to update product' });
    }
};


// Delete a product and its associated discounts
exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        // Find the product by ID
        const product = await db.products.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Find and delete associated discounts
        await db.discounts.destroy({
            where: { productId: id }
        });

        // Delete the product
        await product.destroy();
        
        // Notify the user that the product and discounts were successfully deleted
        res.status(200).json({ message: `Product  have been successfully deleted.` });
    } catch (error) {
        console.error('Error deleting product and discounts:', error);
        res.status(500).json({ error: 'Unable to delete product and discounts' });
    }
};

