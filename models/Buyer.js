const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    profilePicture: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    lastName: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    age: {
        type: Number,
        required: false,
        default: null // Add default value
    },
    location: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    nationality: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    introduceYourself: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    accomplishments: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    backgroundExperience: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    leadershipStyle: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    interests: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    vision: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    personalValues: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    goals: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    reasonForBuying: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    currentPosition: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    freeTimeActivities: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    postSaleInvolvement: {
        type: String,
        required: false,
        default: ''  // Add default value
    },
    timeFrame: {
      type: String,
      required: false,
      default: ''  // Add default value
    },
    typeOfSale: {
      type: String,
      required: false,
      default: ''  // Add default value
    },
    buyerIndustry: {
      type: String,
      required: false,
      default: ''  // Add default value
    },
    buyerLocation: {
      type: String,
      required: false,
      default: ''  // Add default value
    },
    descriptionOfIdealMatch: {
      type: String,
      required: false,
      default: ''  // Add default value
    },
    completedPages: {type: Array, required: false, default: []},
    filters: {type: Array, required: false, default: []}
}, { timestamps: true });

buyerSchema.set('toJSON', {
    transform: (doc, ret) => {
        // Check if capital is a Decimal128 and convert it to a number
        if (ret.capital) {
            ret.capital = parseFloat(ret.capital.toString());  // Convert to number if it's Decimal128
        }
        return ret;
    },
});

// Create a model
const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;
