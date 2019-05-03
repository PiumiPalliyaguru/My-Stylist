
module.exports = (sequelize, DataTypes) => {

    const GalleryImage = sequelize.define('GalleryImage', {
      
      galleryImageUrl1: DataTypes.STRING,
      galleryImageUrl2: DataTypes.STRING,
      galleryImageUrl3: DataTypes.STRING,  
     
      
    }, {});
    GalleryImage.associate = function(db) {
      // associations can be defined here
      // image belongs to stylist
     GalleryImage.belongsTo(db.Stylist);//, {foreignKey: 'stylistId'});
    };
  
  
  
    return GalleryImage;
  };
  