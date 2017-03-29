const Moment = require('./models/moment')

module.exports = ((app, passport) => {


	//newMoments page
	app.get('/newMoment',(req,res)=>{
		res.render('newMoment.ejs')
	})

	


	//moments page
	app.get('/moments', ((req, res)=>{
		Moment.find({}, ((err, moments)=>{
			// console.log("MOMENTS", moments)
			res.render('moments.ejs', {moments: moments})
		}))
		
	}))


	//post new moment
	app.post('/newMoments',  ((req, res)=>{
		let newMoment = new Moment()
		newMoment.moment = req.body.item

		
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
	app.put('/moment/:id', (req,res)=>{
		//check to see if id matches id in database
		if(!(req.params.id === req.body.id)){
			res.status(400).json({
				error: "Request path id and request body id values must match"
			})
		}

		

		Moment.updateOne({_id: req.params.id}, {$set: {moment : req.body}}, function(err, updatedMoment){
			
			res.send('success!')

		}).catch(err => res.status(500).json({message: 'Something went wrong'}))
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

})