
module.exports = (sequelize, DataTypes) => {

    const Location = sequelize.define('Location', {
      
      location: DataTypes.STRING,
      
     
     
      
    }, {});
    Location.associate = function(db) {
      
     Location.belongsTo(db.Stylist);
    };
  
  
  
    return Location;
  };