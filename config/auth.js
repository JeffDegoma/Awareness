module.exports = {

	'facebookAuth':{
		'clientID': '1021654641298003',
		'clientSecret': '0fc070cb8ef6ef57f5a7ea2738d11d37',
		'callbackURL': '/auth/facebook/callback',
		'profileFields': ['id', 'email']

	},

	'twitterAuth':{
		'consumerKey': 'ju1wajN2Cit6U1quVPedPTFPn',
		'consumerSecret': 'fv0I8jPFcHeYgndXsty7kBg6tPWqne0rAx8Qth97PLsB7l2Xgr',
		'callbackURL': '/auth/twitter/callback'

	},

	'googleAuth':{
		'clientID': '510905071248-bhcu7le33dpdsikvgih5nioivq6lor4l.apps.googleusercontent.com',
		'clientSecret': 'ftvtLzywLJ2DInWS_d_1P9n-',
		'callbackURL': '/auth/google/callback'
	}



}


if(process.NODE_ENV === 'production') {

}

else {
	
}