
module.exports = (sequelize, DataTypes) => {
   
    
    const Skill = sequelize.define('Skill', {
     
      
        description:DataTypes.STRING,
      
    });
    Skill.associate = function(db) {
      // associations can be defined here
      Skill.belongsToMany(db.Stylist, {through: 'StylistSkill'});
    };
    
  
    return Skill;
  };