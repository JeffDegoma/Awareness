module.exports = {

	'facebookAuth':{
		'clientID': '1021654641298003',
		'clientSecret': '0fc070cb8ef6ef57f5a7ea2738d11d37',
		'callbackURL': '/auth/facebook/callback',
		'profileFields': ['id', 'email']

	},

	'twitterAuth':{
		'consumerKey': process.env.CONSUMER_KEY,
		'consumerSecret': process.env.CONSUMER_SECRET,
		'callbackURL': '/auth/twitter/callback'

	},

	'googleAuth':{
		'clientID': '510905071248-bhcu7le33dpdsikvgih5nioivq6lor4l.apps.googleusercontent.com',
		'clientSecret': 'ftvtLzywLJ2DInWS_d_1P9n-',
		'callbackURL': '/auth/google/callback'
	}



}
