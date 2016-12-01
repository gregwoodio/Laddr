// feed.js

mw = require('../middleware');

module.exports = function(app, models) {

  app.get('/api/feed/:id', [mw.verifyToken], function(req, res) {

    models.Posting.findAll({
      include: [{
        model: models.PostingTag,
        include: [{
          model: models.Tag,
          include: [{
            model: models.ProfileTag,
            where: {
              ProfileID: req.params.id
            }
          }]
        }]
      }, {
        model: models.Profile,
        include: {
          model: models.Organization
        },
        attributes: ['ProfileID', 'Email', 'PictureURL', 'Timestamp', 'AccountType', 'Archived']
      }],
      where: {
        Archived: false,
        Deadline: {
          $gte: new Date()
        }
      },
      order: [
        ['Timestamp', 'DESC']
      ]
    })
    .then(function(postings) {
      p = [];
      for (i = 0; i < postings.length; i++) {
        p.push(postings[i].dataValues)
        p[i].Preference = 1000;
        sum = 0;
        average = 1000;
        for (j = 0; j < p[i].LdrPostingTags.length; j++) {
          sum += p[i].LdrPostingTags[j].LdrTag.dataValues.LdrProfileTags[0].Preference;
        }

        p[i].Preference = sum / p[i].LdrPostingTags.length;
        
        console.log(p[i].Preference);

        if (p[i].Preference == null) {
          p[i].Preference = 1000;
        }
        if (isNaN(p[i].Preference)) {
          p[i].Preference = 1000;
        }

        p.sort(function(a, b) {
          // Sort in order of decreasing preference
          return b.Preference - a.Preference;
        });
      }

      res.json({
        success: true,
        postings: p
      });
    })
    .catch(function(err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });

  });

}
