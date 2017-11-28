const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

// Validate Function to check titlelength
let titleLengthChecker = (title) => {
  // Check if e-mail exists
  if (!title) {
    return false; // Return error
  } else {
    // Check the length of title string
    if (title.length < 5 || title.length > 50) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid e-mail
    }
  }
};

// Validate Function to check if valid title format
let alphanumericTitleChecker = (title) => {
  // Check if e-mail exists
  if (!title) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid title
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(title); // Return regular expression test results (true or false)
  }
};

//Array of title Validators
const titleValidators = [
  {
    validator: titleLengthChecker,
    message: 'title must be atleast 5 - 50 characters'
  },
  {
    validator: alphanumericTitleChecker,
    message: 'title must consist of only alphanumeric values'
  }];

//Validators should always be above the Schema
let bodyLengthChecker = (body) => {
  // Check if username exists
  if (!body) {
    return false; // Return error
  } else {
    // Check length of body string
    if (body.length < 5 || body.length > 500) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid body
    }
  }
};

// Array of Username validators
const bodyValidators = [
  // First Username validator
  {
    validator: bodyLengthChecker,
    message: 'body must be at least 5 characters but no more than 500'
  }
];

// Validate Function to check comments length
let commentLengthChecker = (comment) => {
  // Check if comment exists
  if (!comment[0]) { //changed because it is an array
    return false; // Return error
  } else {
    // Check comment length
    if (comment[0].length < 1 || comment[0].length > 200) {
      return false; // Return error if comments length requirement is not met
    } else {
      return true; // Return comments as valid
    }
  }
};


// Array of Password validators
const commentValidators = [
  // First password validator
  {
    validator: commentLengthChecker,
    message: 'comment but no more than 200'
  }
];


const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: titleValidators
   },
  body: {
    type: String,
    required: true,
    validate: bodyValidators
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type:Date,
    default:
    Date.now()
  },
  likes:  {
    type: Number,
    default: 0
  },
  likedBy: {
    type:Array
  },
  dislikes:  {
    type: Number,
    default: 0
  },
  dislikedBy: {
    type:Array
  },
  comments : [
    {
      comment: { type: String, validate: commentValidators},
      commentator: { type: String }
    }
  ]
});

module.exports = mongoose.model('Blog', blogSchema);
