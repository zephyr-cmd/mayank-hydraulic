const mongoose = require("mongoose");
const { Schema } = mongoose;

const manufacturerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: { type: String },
    contact_details: {
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
      address: {
        type: String,
      },
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Manufacturer ||
  mongoose.model("Manufacturer", manufacturerSchema);
