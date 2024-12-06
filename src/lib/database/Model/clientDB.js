const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    countryCode: {
      type: String,
      match: /^\+\d{1,3}$/, // Validates phone codes like +91, +1, +358
      validate: {
        validator: (v) => /^\+\d{1,3}$/.test(v),
        message: (props) => `${props.value} is not a valid country dial code!`,
      },
    },
    phoneNumber: {
      type: Number,
      min: 1000000000, // Minimum 10 digits
      max: 9999999999999, // Max 13 digits for international numbers
      validate: {
        validator: (v) => /^\d{10,13}$/.test(v.toString()), // Validates length and numeric input
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    email: {
      type: String,
      lowercase: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Email pattern validation
    },
    image: {
      type: String,
    },
    description: String,
    saleLead: {
      type: Boolean,
      default: false,
    },
    requestRaiseFrom: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Client || mongoose.model("Client", schema);
