//models.js

var process = require('process');
if (process.env.NODE_ENV == 'test') {
  var db = require('../config/testdatabase');
} else {
  var db = require('../config/database')
}
var connection = require('knex')(db);
var Bookshelf = require('bookshelf')(connection);

//models
var Profile = Bookshelf.Model.extend({
  tableName: 'LdrProfiles'
});

var User = Bookshelf.Model.extend({
  tableName: 'LdrUsers',
  ProfileID: function() {
    return this.belongsTo(Profile, 'ProfileID');
  }
});

var Organization = Bookshelf.Model.extend({
  tableName: 'LdrOrganizations',
  ProfileID: function() {
    return this.belongsTo(Profile, 'ProfileID');  
  }
});

var Posting = Bookshelf.Model.extend({
  tableName: 'LdrPostings',
  ProfileID: function() {
    return this.belongsTo(Profile, 'ProfileID');
  }
});

var Topic = Bookshelf.Model.extend({
  tableName: 'LdrTopics',
  Creator: function() {
    return this.belongsTo(Profile, 'Username');
  }
});

var Comment = Bookshelf.Model.extend({
  tableName: 'LdrComments',
  TopicID: function() {
    return this.belongsTo(Topic, 'TopicID');
  },
  Author: function() {
    return this.belongsTo(Profile, 'Username');
  }
});

//collections
var Profiles = Bookshelf.Collection.extend({
  model: Profile
});

var Users = Bookshelf.Collection.extend({
  model: User
});

var Organizations = Bookshelf.Collection.extend({
  model: Organization
});

var Postings = Bookshelf.Collection.extend({
  model: Posting
});

var Topics = Bookshelf.Collection.extend({
  model: Topic
});

var Comments = Bookshelf.Collection.extend({
  model: Comment
});

module.exports = {
  Profile,
  User,
  Organization,
  Posting,
  Topic,
  Comment,
  Profiles,
  Users,
  Organizations,
  Postings,
  Topics,
  Comments
};