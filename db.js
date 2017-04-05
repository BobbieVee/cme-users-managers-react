const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL);

const User = db.define('user', {
	name: Sequelize.STRING,
	isManager: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
});
User.belongsTo(User, {as: 'manager'});
User.hasMany(User, {
		as: 'manageBy',
		foreignKey: 'managerId'
	}
)

const sync = ()=> db.sync({force: true});

const seed = ()=>{
	const users = [['Moe', true], ['Larry', true], ['Curly', false]];
	const managedBy = [[1,2],[2,3]];
	return sync()
	.then(()=> {
		return Promise.all([
			users.map((user) => User.create({name: user[0], isManager: user[1]}))
		])
	})
	.then(()=> {
		return Promise.all([
			managedBy.map((data) => User.update({managerId: data[0]}, {where:  {id: data[1]}}))
		])
	})
	.then(()=> console.log("\'Thynked and theeded!\', thays Daffy"));
}


module.exports = {
	models: {
		User
	},
	sync,
	seed
}
