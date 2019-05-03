
module.exports = (sequelize, DataTypes) => {

    const ProfileImage = sequelize.define('ProfileImage', {
      
      ProfileUrl: DataTypes.STRING,
      
     
     
      
    }, {});
    ProfileImage.associate = function(db) {
     
     ProfileImage.belongsTo(db.Stylist);
    };
  
  
  
    return ProfileImage;
  };