const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: true,
      enum: ["info", "warn", "error"], // Matches your logger levels
    },
    message: {
      type: String,
      required: true, // e.g., "GET /api/users - 200"
    },
    metadata: {
      method: String,
      path: String,
      ip: String,
      userId: {
        type: mongoose.Schema.Types.ObjectId, // or String depending on your User model ID type
        default: null,
      },
      username: {
        type: String,
        default: null,
      },
      statusCode: Number,
      metadata: {
        duration: String, // e.g., "14ms"
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;