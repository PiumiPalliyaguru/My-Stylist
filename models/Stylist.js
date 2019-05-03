

module.exports = (sequelize, DataTypes) => {
  const Stylist = sequelize.define('Stylist', {
      
      
      firstName:DataTypes.STRING,
      lastName:DataTypes.STRING,
      type:DataTypes.STRING,
      fulldayrate:DataTypes.STRING,
      halfdayrate:DataTypes.STRING,
     
  });

  
  Stylist.associate = function(db) {

    Stylist.hasOne( db.ProfileImage);
    Stylist.hasOne( db.Location);
    Stylist.hasMany( db.GalleryImage);
    Stylist.hasMany(db.Schedule);
    Stylist.belongsToMany(db.Skill, {through: 'StylistSkill'});
    //Stylist.belongsToMany(db.ServiceType, {through: 'StylistService'});
    
  };



  return Stylist;
};