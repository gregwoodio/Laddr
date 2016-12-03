# Laddr/app/api

This directory contains all of our API routes, which take a request and return a JSON response. They are:

- **applicants.js** - The route used for an Organization to query who has applied for one of their postings.
- **applications.js** - Used for a User to see the status of applications they have submitted to various postings.
- **apply.js** - Allows a User to apply to a posting, as well as allows an Organization to accept or deny that application.
- **comment.js** - Route for Comments in the forum, which can be queried, added or deleted.
- **events.js** - This route is just for populating the calendar in the feed, and obtains the dates of all postings for which the user has been accepted.
- **feed.js** - Looks through available postings and orders them by User's preference for the tags the posting contains. Used in the home feed.
- **imageupload.js** - Unsurpisingly, imageupload.js handles the uploading of user avatar images.
- **login.js** - Uses the passport module to authenticate a user, then returns a token to be used with further API calls.
- **organization.js** - Routes for Organizations including querying for public Organization data, adding a new Organization and modifying an existing Organization. Organziations can also be 'deleted', where we remove their postings, comments and topics and mark the account as Archived.
- **password.js** - Route for changing a password.
- **posting.js** - API reoute for getting an individual posting or a group of postings, adding, modifying and deleting postings.
- **profile.js** - Both Users and Organizations are child objects of Profiles. The profile API route is private, and is used to return information about the logged in user.
- **profiletags.js** - This route is called when a user looks at a posting or applies to a posting. It updates their preference for the various tags that identify Postings, which we use in the ```feed.js``` routes to give personalized suggestions of Postings the user might enjoy.
- **tag.js** - Used to retrieve a list of available tags.
- **topic.js** - Used to create, modify, query and delete forum Topics. 
- **twitter.js** - The authentication route allowing for login via Twitter. This was never fully implemented, although the authentication works and the token is returned from Twitter.
- **user.js** - Routes for adding, querying, modifying and deleting User accounts.