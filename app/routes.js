const Moment = require('./models/moment')

module.exports = ((app, passport) => {

	

	//newMoments page
	app.get('/newMoment', isLoggedIn, (req, res) => {
		res.render('newMoment.ejs')
	})

	
	//moments page
	app.get('/moments', isLoggedIn, ((req, res) => {

		console.log("USER", req.user)
		// console.log("BODY", req.body.item)


		Moment.find({user: req.user._id}, ((err, moments) => {
			res.render('moments.ejs', {moments: moments})
		}))
		
	}))


	//Post new moment
	app.post('/newMoments',  ((req, res) => {
		let newMoment = new Moment()
		//assign moment from Database to request body
		newMoment.moment = req.body.item
		newMoment.title = req.body.title

		newMoment.user = req.user._id
		
		newMoment.save((err, savedMoment) => {
			if(!err) {
				res.send('it worked!')
			}
			else {
				res.send("it didn't work!")	
			}
		})

		
	}))

	//Update new moment
	app.put('/moments/:id', (req,res)=>{


		Moment.findByIdAndUpdate(req.params.id, {moment: req.body.moment}, function(err, updatedMoment){

			if(!err)
				res.send('EDIT success')

		})
	})

	//Delete moment from database
	app.delete('/moments/:id', (req, res)=>{
		console.log(req.body)
		Moment.findByIdAndRemove(req.params.id, err => {
			if(err)
				throw err;
			res.send("DELETE success")
		})
	})





	//Local Route======================
	app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/newMoment', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));



	//Facebook Routes==================
	//authenticate and login
	app.get('/auth/facebook', passport.authenticate('facebook',{scope : ['email']}))

	//handle callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',

		passport.authenticate('facebook',{

			successRedirect: '/newMoment',

			failureRedirect: '/'
		}))




	// Twitter routes =====================
	// authenticate and login
	app.get('/auth/twitter', passport.authenticate('twitter'))

	//handle callback after facebook has authenticated the user
	app.get('/auth/twitter/callback',

		passport.authenticate('twitter',{

			successRedirect: '/newMoment',

			failureRedirect: '/'
		}))


	// Google routes =========================
	// Authenticate and login
	app.get('/auth/google',  passport.authenticate('google',{
		scope: ['profile', 'email']
	}))

	app.get('/auth/google/callback',

		passport.authenticate('google',{

			successRedirect: '/newMoment',

			failureRedirect: '/'
	}))
	


	//Logout
	app.get('/logout', (req,res)=>{
		req.logout()
		res.redirect('/')
	})



	
	//Paint the dom
	app.get('/moments/all', (req, res) => {
		Moment.find({user: req.user._id}, function(err, moments){
			if(err)
				throw err
			res.json(moments)
		})
	})



	function isLoggedIn(req,res,next){
		if(req.isAuthenticated())
			return next()

		//If they aren't redirect to the home page.
		res.redirect('/')
	}


})