const sequelize = require('sequelize');
const bodyParser = require('body-parser');

module.exports = function (app, db) {

  const Op = sequelize.Op;

  app.get('/home', function (req, res) {
    res.render('home', {});
  });

  var urlencodedParser = bodyParser.urlencoded({ extended: false });


  //basic search
  app.post('/search', urlencodedParser, function (req, res) {

    var location = req.body.location;
    var type = req.body.Type;
    //console.log(type);

    if (type === 'all' || type === '' && location === 'all' || location === '') {

      db.Stylist.findAll({
        order: [['fulldayrate','DESC']],
        include:[db.Location]
      }).then(function (ltResult) {

        res.render('search', {

          ltResult,
          id: ltResult.id,
          firstName: ltResult.firstName,
          lastName: ltResult.lastName,
          type: ltResult.type,
          fulldayrte: ltResult.fulldayrate,
          halfdayrate: ltResult.halfdayrate,
          //location: ltResult[0].Location.location,

        });

      });



    } else if (type === 'all' || type === '' ) {
      db.Stylist.findAll({
        include: [{ model: db.Location, where: { location: req.body.location } }],
        order: [['fulldayrate','DESC']],
      }).then(function (ltResult) {

        res.render('search', {

          ltResult,
          id: ltResult.id,
          firstName: ltResult.firstName,
          lastName: ltResult.lastName,
          type: ltResult.type,
          fulldayrte: ltResult.fulldayrate,
          halfdayrate: ltResult.halfdayrate,
         // location: ltResult[0].Location.location,

        });

      });

    } else if (location === 'all' || type === '') {
      db.Stylist.findAll({
        where: { type: req.body.type },
        order: [['fulldayrate','DESC']],
        include:[db.Location],
      }).then(function (ltResult) {

        res.render('search', {

          ltResult,
          id: ltResult.id,
          firstName: ltResult.firstName,
          lastName: ltResult.lastName,
          type: ltResult.type,
          fulldayrte: ltResult.fulldayrate,
          halfdayrate: ltResult.halfdayrate,
          // location: ltResult[0].Location.location,

        });

      });


    } else {
      db.Stylist.findAll({
        where: { type: req.body.type },
        include: [{ model: db.Location, where: { location: req.body.location } }],
        order: [['fulldayrate','DESC']],
      }).then(function (ltResult) {

        res.render('search', {

          ltResult,
          id: ltResult.id,
          firstName: ltResult.firstName,
          lastName: ltResult.lastName,
          type: ltResult.type,
          fulldayrte: ltResult.fulldayrate,
          halfdayrate: ltResult.halfdayrate,
         location: ltResult[0].Location.location,

        });
      });
    }
  });

  //advance search skill
  app.post('/advance', urlencodedParser, function (req, res) {

    var skill = req.body.skill;
    var location = req.body.location;
    var type = req.body.Type;
    var maxRate = req.body.maxRate;
    var minRate = req.body.minRate;

    if (maxRate === '' || minRate === ''){

      if (skill === 'all'|| skill === '') {
        db.Stylist.findAll({
          where: {
            type: req.body.type,
          },
          order: [['fulldayrate','DESC']],
  
          include: [{
            model: db.Location, where: { location: req.body.location },
            
          },db.Skill],
          
  
  
  
        }).then(function (ltResult) {
         // console.log(ltResult[0].Skills[0].description);
        
          res.render('search', {
  
            ltResult,
            id: ltResult.id,
            firstName: ltResult.firstName,
            lastName: ltResult.lastName,
            type: ltResult.type,
            fulldayrte: ltResult.fulldayrate,
            halfdayrate: ltResult.halfdayrate,
           // location: ltResult[0].Location.location,
  
          });
        });
      } else {
        db.Stylist.findAll({
          where: {
            type: req.body.type,
          },
          order: [['fulldayrate','DESC']],
  
          include: [{
            model: db.Location, where: { location: req.body.location }
          },
          { model: db.Skill, where: { description: req.body.skill } }],
  
  
  
        }).then(function (ltResult) {
         // console.log(ltResult[0].Skills[0].description);
          res.render('search', {
  
            ltResult,
            id: ltResult.id,
            firstName: ltResult.firstName,
            lastName: ltResult.lastName,
            type: ltResult.type,
            fulldayrte: ltResult.fulldayrate,
            halfdayrate: ltResult.halfdayrate,
           //  location: ltResult[0].Location.location,
  
          });
        });
  
      }
      
    
    }else if (req.body.skill === 'all' || req.body.skill === '' ){
      db.Stylist.findAll({
        where: {
          type: req.body.type,
        },
        order: [['fulldayrate','DESC']],

        include: [{
          model: db.Location, where: { location: req.body.location }}],



      }).then(function (ltResult) {
       // console.log(ltResult[0].Skills[0].description);
        res.render('search', {

          ltResult,
          id: ltResult.id,
          firstName: ltResult.firstName,
          lastName: ltResult.lastName,
          type: ltResult.type,
          fulldayrte: ltResult.fulldayrate,
          halfdayrate: ltResult.halfdayrate,
         // location: ltResult[0].Location.location,
          

        });
      });
    }else {
      db.Stylist.findAll({
        where: {
          type: req.body.type,
          fulldayrate: { [Op.between]: [req.body.minRate, req.body.maxRate] }
        },
        order: [['fulldayrate','DESC']],

        include: [{
          model: db.Location, where: { location: req.body.location }
        },
        { model: db.Skill, where: { description: req.body.skill } }],



      }).then(function (ltResult) {
       // console.log(ltResult[0].Skills[0].description);
        res.render('search', {

          ltResult,
          id: ltResult.id,
          firstName: ltResult.firstName,
          lastName: ltResult.lastName,
          type: ltResult.type,
          fulldayrate: ltResult.fulldayrate,
          halfdayrate: ltResult.halfdayrate,
          //location: ltResult[0].Location.location,

        });
      });
    }
  });



  // view profile

  app.get('/profile/:id', urlencodedParser, function (req, res) {

    var id = req.params.id;

    db.Stylist.findAll({

      where: { id: req.params.id },
      order: [['fulldayrate','DESC']],
      include: [db.Location, db.ProfileImage, db.GalleryImage,db.Skill]

    }).then(function (profile) {
       console.log(profile[0].Skills[0].description);
       // console.log(profile.fulldayrate);
      res.render('profile', {
        profile,
        id: profile[0].id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        type: profile.type,
        fulldayrate: profile.fulldayrate,
        halfdayrate: profile.halfdayrate,
        profileImage: profile[0].ProfileImage.ProfileUrl,
        skill:profile[0].Skills[0].description,
        //location: profile[0].Location.location,
        //skill: profile[0].Skills[0].description,
      });
    });
  });

}