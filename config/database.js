  // database.js

var process = require('process');

module.exports = {
  'client': 'mysql',
  'connection': {
    'host': 'localhost',
    'user': 'ladder',
    'password': 'codebusters',
    'database': 'Ladder',
    'charset':'utf8'
  }
  // 'comments_table': 'LdrComments',
  // 'organizations_table': 'LdrOrganizations',
  // 'postings_table': 'LdrPostings',
  // 'profiles_table': 'LdrProfile',
  // 'topics_table': 'LdrTopics',
  // 'users_table': 'LdrUsers'
  
};
