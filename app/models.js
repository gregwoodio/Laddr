//models.js
var process = require('process');
var Sequelize = require('sequelize');

if (process.env.NODE_ENV == 'test') {
  // var db = require('../config/testdatabase');
  
  // sequelize testing db
  var sequelize = new Sequelize('TestLadder', 'ladder', 'codebusters', {
    host: 'localhost',
      dialect: 'mysql',

      pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
  });
} else {
  // var db = require('../config/database')

  // sequelize production db
  var sequelize = new Sequelize('Ladder', 'ladder', 'codebusters', {
    host: 'localhost',
      dialect: 'mysql',

      pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
  });
}

var Profile = sequelize.define('LdrProfiles', {
  ProfileID: {type: Sequelize.STRING, primaryKey: true},
  Username: {type: Sequelize.STRING, allowNull: false, unique: 'compositeIndex'},
  Email: {type: Sequelize.STRING},
  Password: {type: Sequelize.STRING, allowNull: false},
  PictureURL: {type: Sequelize.STRING},
  Timestamp: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
  AccountType: {type: Sequelize.INTEGER, defaultValue: 0},
}, {
  //don't include Sequelize timestamps
  timestamps: false
});

var User = sequelize.define('LdrUsers', {
  ProfileID: { //foreign key
    model: Profile,
    key: 'ProfileID',
    type: Sequelize.STRING,
    primaryKey: true
  },
  FirstName: {type: Sequelize.STRING, allowNull: false},
  LastName: {type: Sequelize.STRING, allowNull: false},
  Description: {type: Sequelize.STRING},
  Resume: {type: Sequelize.STRING}, //TODO:maybe should be BLOB
  AcademicStatus: {type: Sequelize.INTEGER}
}, {
  timestamps: false
});

User.belongsTo(Profile, {foreignKey: 'ProfileID'});
Profile.hasOne(User, {foreignKey: 'ProfileID'});

var Organization = sequelize.define('LdrOrganizations', {
  ProfileID: {
    model: Profile,
    key: 'ProfileID',
    type: Sequelize.STRING,
    primaryKey: true
  },
  OrganizationName: {type: Sequelize.STRING, allowNull: false},
  Address: {type: Sequelize.STRING},
  URL: {type: Sequelize.STRING},
  MissionStatement: {type: Sequelize.STRING}
}, {
  timestamps: false
});

Organization.belongsTo(Profile, {foreignKey: 'ProfileID'});
Profile.hasOne(Organization, {foreignKey: 'ProfileID'});  

var Posting = sequelize.define('LdrPostings', {
  PostingID: {type: Sequelize.STRING, primaryKey: true},
  ProfileID: {
    model: Profile,
    key: 'ProfileID',
    type: Sequelize.STRING
  },
  JobTitle: {type: Sequelize.STRING, allowNull: false},
  Location: {type: Sequelize.STRING, allowNull: false},
  Description: {type: Sequelize.STRING, allowNull: false},
  Timestamp: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
}, {
  timestamps: false
});

Posting.belongsTo(Profile, {foreignKey: 'ProfileID'});

var Topic = sequelize.define('LdrTopics', {
  TopicID: {type: Sequelize.STRING, primaryKey: true},
  Title: {type: Sequelize.STRING, allowNull: false},
  Creator: {type: Sequelize.STRING, allowNull: false},
  Timestamp: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
  Archived: {type: Sequelize.BOOLEAN}
}, {
  timestamps: false
});

var Comment = sequelize.define('LdrComments', {
  CommentID: {type: Sequelize.STRING, primaryKey: true},
  Author: {type: Sequelize.STRING, allowNull: false},
  Timestamp: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
  TopicID: {
    model: Topic,
    key: 'TopicID',
    type: Sequelize.STRING
  },
  Body: {type: Sequelize.STRING, allowNull: false}, //TODO: Should be blob
  Archived: {type: Sequelize.BOOLEAN}
}, {
  timestamps: false
});

Comment.belongsTo(Topic, {foreignKey: 'TopicID'});

module.exports = {
  sequelize,
  Profile,
  User,
  Organization,
  Posting,
  Topic,
  Comment
};