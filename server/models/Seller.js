const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
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
    businessModelCanvas: {
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
    reasonForSelling: {
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
    sellerIndustry: {
      type: String,
      required: false,
      default: ''  // Add default value
    },
    sellerLocation: {
      type: String,
      required: false,
      default: ''  // Add default value
    },
    descriptionOfIdealMatch: {
      type: String,
      required: false,
      default: ''  // Add default value
    },
    business: {
        type: String,
        required: false,
        default: ''
    },
    businessLocation: {
        type: String,
        required: false,
        default: ''
    },
    salesVolumeEUR: {
        type: Number,
        required: false,
        default: null
    },
    resultEUR: {
        type: Number,
        required: false,
        default: null
    },
    employees: {
        type: Number,
        required: false,
        default: null
    },
    shareToBeTransferred: {
        type: String,
        required: false,
        default: ''
    },
    transactionBackground: {
        type: String,
        required: false,
        default: ''
    },
    productMarketFit: {
        type: String,
        required: false,
        default: ''
    },
    valueProposition: {
        type: String,
        required: false,
        default: ''
    },
    profitMargin: {
        type: Number,
        required: false,
        default: null
    },
    revenue: {
        type: Number,
        required: false,
        default: null
    },
    cashflow: {
        type: Number,
        required: false,
        default: null
    },
    customerBase: {
        type: String,
        required: false,
        default: ''
    },
    companyCulture: {
        type: String,
        required: false,
        default: ''
    },
    completedPages: {type: Array, required: false, default: []},
    filters: {type: Array, required: false, default: []}
}, { timestamps: true });

sellerSchema.set('toJSON', {
    transform: (doc, ret) => {
        if (ret.capital) {
            ret.capital = parseFloat(ret.capital.toString());  // Convert to number if it's Decimal128
        }
        return ret;
    },
});

// Create a model
const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
