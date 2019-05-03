
module.exports = (sequelize, DataTypes) => {

    const Schedule = sequelize.define('Schedule', {
      
      
        date:DataTypes.DATE,
        session:DataTypes.STRING,
        status:DataTypes.STRING
        
    });
    Schedule.associate = function(db) {
      // associations can be defined here
      Schedule.belongsTo(db.Stylist);//, foreignKey:'scheduleId'});
    };
    
    return Schedule;
  };