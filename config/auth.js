module.exports = {

	'facebookAuth':{
		'clientID': process.env.FACEBOOK_CLIENT_ID,
		'clientSecret': process.env.FACEBOOK_SECRET,
		'callbackURL': '/auth/facebook/callback',
		'profileFields': ['id', 'email']

	},

	'twitterAuth':{
		'consumerKey': process.env.CONSUMER_KEY,
		'consumerSecret': process.env.CONSUMER_SECRET,
		'callbackURL': '/auth/twitter/callback'

	},

	'googleAuth':{
		'clientID': process.env.GOOGLE_CLIENT_ID,
		'clientSecret': process.env.GOOGLE_CLIENT_SECRET,
		'callbackURL': '/auth/google/callback'
	}



};


