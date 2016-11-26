// api/profiletags.js

var mw = require('../middleware');

module.exports = function(app, models) {

  // update user preferences based on page visit
  app.post('/api/profiletags', mw.verifyToken, function(req, res) {

    if (req.body.PostingID != undefined && req.body.ProfileID != undefined ) {

      pt = [];
      sum = 0;

      console.log('Finding all tags...');
      models.Tag.findAll().then(function(tags) {

        console.log('Finding or creating ProfileTags...');
        for (i = 0; i < tags.length; i++) {

          console.log(tags[i]);

          models.ProfileTag.findOrCreate({
            where: {
              ProfileID: req.body.ProfileID,
              TagID: tags[i].TagID
            }, 
            defaults: {
              Preference: 1000.0
            }
          })
          .spread(function(profileTag, created) {
            pt.push(profileTag);
          })
          .catch(function(err) {
            res.status(500).json({
              success: false,
              message: 'Block 1: ' + err.message
            });
            return;
          });
        }
        //now that we've definitely got all the Tags associated with Profile, lets go ahead and update them
        models.PostingTag.findAll({
          where: {
            PostingID: req.body.PostingID
          }
        })
        .then(function(postingTags) {

          // console.log('****PostingTags********\n', pt);

          for (i = 0; i < pt.length; i++) {
            // console.log('sum += ' + pt[i].dataValues.Preference);
            sum += pt[i].dataValues.Preference;
          }

          // console.log('Sum: ' + sum);

          for (i = 0; i < pt.length; i++) {
            pt[i].ExpectedValue = new Number(pt[i].Preference / sum);
            pt[i].Result = 0;
            for (j = 0; j < postingTags.length; j++) {
              if (pt[i].TagID == postingTags[j].TagID) {
                pt[i].Result = 1;
              }
            }

            // console.log('Tag: ' + pt[i].TagID + ' Expected Value: ' + pt[i].ExpectedValue);
          }

          // find the new values
          // console.log('Finding new values.');

          for (i = 0; i < pt.length; i++) {

            console.log('Tag ID: ' + pt[i].TagID + ' Preference: ' + pt[i].Preference);
            pt[i].Preference = pt[i].Preference + 32 * (pt[i].Result - pt[i].ExpectedValue);
            console.log('Tag ID: ' + pt[i].TagID + ' Preference: ' + pt[i].Preference);

            // update the database
            models.ProfileTag.update({
              Preference: pt[i].Preference,
            }, {
              where: {
                ProfileID: req.body.ProfileID,
                TagID: pt[i].TagID
              }
            })
            .then(function(pt) {
              // console.log('ProfileTagID ' + pt.pt + ' updated.');
            })
            .catch(function(err) {
              // res.status(500).json({
              //   success: false,
              //   message: 'Block 2: ' + err.message
              // });
            });

          }

          

        })
        .catch(function(err) {
          // res.status(500).json({
          //   success: false,
          //   message: 'Block 3: ' + err.message
          // });
        });
      

      res.json({
        success: true,
        message: 'Preferences updated.'
      });

    })
      .catch(function(err) {
        // res.status(500).json({
        //   success: false,
        //   message: 'Block 5: ' + err.message
        // });
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Missing parameters'
      });
    }

  });

};
