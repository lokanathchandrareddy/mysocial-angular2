const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  // uri : 'mongodb://localhost:27017/newsocialapp',//development databse URI and Database Name
  uri : 'mongodb://iwsmavericks:iws@ds123896.mlab.com:23896/socialacademicportal', //production
  secret : crypto,
  // db: 'newsocialapp'// development database name
  db: 'socialacademicportal' //production database name
}
