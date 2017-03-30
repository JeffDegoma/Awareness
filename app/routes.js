const Moment = require('./models/moment')

module.exports = ((app, passport) => {


	//newMoments page
	app.get('/newMoment',(req,res)=>{
		res.render('newMoment.ejs')
	})

	

	//moments page
	app.get('/moments', ((req, res)=>{

		// look at req.user
		// console.log("USER", req.user)
		// console.log("BODY", req.body.item)

		Moment.find({}, ((err, moments)=>{
			console.log("MOMENTS", moments)
			res.render('moments.ejs', {moments: moments})
		}))
		
	}))


	//post new moment
	app.post('/newMoments',  ((req, res)=>{
		let newMoment = new Moment()
		//assign moment from Database to body
		newMoment.moment = req.body.item

		console.log(newMoment.moment)
		newMoment.save(function(err, savedMoment){
			if(!err) {
				res.send('it worked!')
			}
			else {
				res.send("it didn't work!")	
			}
		})

		
	}))

	//update new moment
	app.put('/moments/:id', (req,res)=>{

		console.log("REQ BODY", req.body)

		Moment.findByIdAndUpdate(req.params.id, {moment: req.body.moment}, function(err, updatedMoment){

			console.log(updatedMoment)
			if(!err)
				res.send('success!')

		})
	})

	//delete moment from database
	app.delete('/moments/:id', (req, res)=>{
		Moment.findByIdAndRemove(req.params.id, err => {
			if(err)
				throw err;
			res.send("success")
		})
	})


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
	// authenticate and login
	app.get('/auth/google', passport.authenticate('google',{
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



	
	//paint the dom
	app.get('/moments/all', (req,res)=>{
		Moment.find({}, function(err, moments){
			if(err)
				throw err
			res.json(moments)
		})
	})



	function isLoggedIn(req,res,next){
		if(req.isAuthenticated())
			return next()

		//if they aren't redirect to the home page.
		res.redirect('/')
	}




})