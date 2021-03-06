import { App } from ".";

export default  (sequelize, DataTypes) => { 

    const Role = sequelize.define('roles', {
        name: {
            type: DataTypes.STRING(),
        },
        cardLevel: {
            type: DataTypes.INTEGER(),
            defaultValue: 0,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN(),
            defaultValue: false,
        },
        
    });
    Role.associate = models => {
        Role.belongsTo(models.App);
        Role.belongsToMany(models.User, {through: 'user_roles'});

    }

   

    Role.countInApp = function(name, appId){
        return this.findOne({
            attributes: { include: [[sequelize.fn('COUNT', sequelize.col('name')), "countName"]] },
            where: { name, appId }
        });
    }



    return Role;
};

