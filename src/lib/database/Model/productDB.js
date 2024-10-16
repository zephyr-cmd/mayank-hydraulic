const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    manufacturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manufacturer",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // Dynamic Specifications: Array of key-value objects
    specifications: [
      {
        key: { type: String, required: true }, // e.g., "pressure"
        value: { type: String, required: true }, // e.g., "1500 PSI"
      },
    ],
    inventory: {
      quantity_in_stock: {
        type: Number,
        required: true,
      },
      lead_time_days: {
        type: Number,
      },
    },
    images: [
      {
        type: String,
      },
    ],
    isPopular: { type: Boolean, default: false }, // New field to mark as popular
    views: { type: Number, default: 0 }, // Optional: Track product views
    salesCount: { type: Number, default: 0 }, // Optional: Track sales to determine popularity
  },
  { timestamps: true }
);

// Indexes
// Index on 'categoryId' for efficient queries by category
productSchema.index({ categoryId: 1 });

// Index on 'manufacturerId' for efficient queries by manufacturer
productSchema.index({ manufacturerId: 1 });

productSchema.indexes({ createdAt: 1, _id: 1 });

// Text index on 'name' and 'description' for full-text search
productSchema.index({ name: "text", description: "text" });

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
