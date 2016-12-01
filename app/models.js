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
      //logging: false,

      pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
  });
}

var Profile = sequelize.define('LdrProfiles', {
  ProfileID: {type: Sequelize.STRING, primaryKey: true},
  //Username: {type: Sequelize.STRING, allowNull: false, unique: 'compositeIndex'},
  Email: {type: Sequelize.STRING, defaultValue: ''},
  Password: {type: Sequelize.STRING, allowNull: true},
  PictureURL: {type: Sequelize.STRING, defaultValue: ''},
  Timestamp: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
  AccountType: {type: Sequelize.INTEGER, defaultValue: 0},
  TwitterID: {type: Sequelize.STRING, allowNull: true},
  TwitterToken: {type: Sequelize.STRING, allowNull: true},
  Archived: {type: Sequelize.BOOLEAN, defaultValue: false}
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
  AcademicStatus: {type: Sequelize.INTEGER},
  Fdi: {type: Sequelize.STRING},
  ShowMessage: {type: Sequelize.BOOLEAN, defaultValue: false}
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
  AddressLine1: {type: Sequelize.STRING, allowNull: false},
  AddressLine2: {type: Sequelize.STRING, allowNull: true},
  City: {type: Sequelize.STRING, allowNull: false},
  Province: {type: Sequelize.STRING, allowNull: false},
  Postal: {type: Sequelize.STRING, allowNull: false},
  URL: {type: Sequelize.STRING},
  Lat: {type: Sequelize.DOUBLE, allowNull: true},
  Lng: {type: Sequelize.DOUBLE, allowNull: true},
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
  Lat: {type: Sequelize.DOUBLE, allowNull: true},
  Lng: {type: Sequelize.DOUBLE, allowNull: true},
  Timestamp: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
  Archived: {type: Sequelize.BOOLEAN, defaultValue: false},
  EventDate: {type: Sequelize.DATE},
  Deadline: {type: Sequelize.DATE},
  Repeating: {type: Sequelize.INTEGER, defaultValue: 0}
}, {
  timestamps: false
});

Posting.belongsTo(Profile, {foreignKey: 'ProfileID'});

var Topic = sequelize.define('LdrTopics', {
  TopicID: {type: Sequelize.STRING, primaryKey: true},
  Title: {type: Sequelize.STRING, allowNull: false},
  ProfileID: {
    model: Profile,
    key: 'ProfileID',
    type: Sequelize.STRING
  },
  Timestamp: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
  Archived: {type: Sequelize.BOOLEAN}
}, {
  timestamps: false
});

Topic.belongsTo(Profile, {foreignKey: 'ProfileID'});

var Comment = sequelize.define('LdrComments', {
  CommentID: {type: Sequelize.STRING, primaryKey: true},
  ProfileID: {
    model: Profile,
    key: 'ProfileID',
    type: Sequelize.STRING
  },
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
Comment.belongsTo(Profile, {foreignKey: 'ProfileID'});

var Application = sequelize.define('LdrApplications', {
  ProfileID: {
    model: Profile,
    key: 'ProfileID',
    type: Sequelize.STRING,
    primaryKey: true //cool, composite key!
  },
  PostingID: {
    model: Posting,
    key: 'PostingID',
    type: Sequelize.STRING,
    primaryKey: true //cool, composite key!
  },
  ApplicationStatus: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  Timestamp: {
    type: Sequelize.DATE, 
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false
});

Application.belongsTo(Profile, {foreignKey: 'ProfileID'});
Application.belongsTo(Posting, {foreignKey: 'PostingID'});

var Tag = sequelize.define('LdrTags', {
  TagID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

var PostingTag = sequelize.define('LdrPostingTags', {
  PostingTagID: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  PostingID: {
    model: Posting,
    key: 'PostingID',
    type: Sequelize.STRING
  },
  TagID: {
    model: Tag,
    key: 'TagID',
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

Posting.hasMany(PostingTag, {foreignKey: 'PostingID'});
Tag.hasMany(PostingTag, {foreignKey: 'TagID'});
PostingTag.belongsTo(Posting, {foreignKey: 'PostingID'});
PostingTag.belongsTo(Tag, {foreignKey: 'TagID'});

var ProfileTag = sequelize.define('LdrProfileTags', {
  // ProfileTagID: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true
  // },
  ProfileID: {
    model: Profile,
    key: 'ProfileID',
    type: Sequelize.STRING,
    primaryKey: true
  },
  TagID: {
    model: Tag,
    key: 'TagID',
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  Preference: {
    type: Sequelize.DOUBLE,
    defaultValue: 1000.0
  }
}, {
  timestamps: false
});

ProfileTag.belongsTo(Profile, {foreignKey: 'ProfileID'});
ProfileTag.belongsTo(Tag, {foreignKey: 'TagID'});
Profile.hasMany(ProfileTag, {foreignKey: 'ProfileID'});
Tag.hasMany(ProfileTag, {foreignKey: 'TagID'});

if (process.env.NODE_ENV == 'test') {
  //add tags for tests
  Tag.build({
    Name: "Testing"
  })
  .save()
  .then(function(tag) {
    console.log("Test tag added.");
  });
}

module.exports = {
  sequelize: sequelize,
  Profile: Profile,
  User: User,
  Organization: Organization,
  Posting: Posting,
  Topic: Topic,
  Comment: Comment,
  Application: Application,
  Tag: Tag,
  PostingTag: PostingTag,
  ProfileTag: ProfileTag
};
