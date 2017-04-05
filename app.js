const express = require('express');
const app = express();
const db = require('./db');
const User = db.models.User;

const port = process.env.PORT || 3000;

app.get('/', (req, res, next)=> {
	User.findAll()
	.then( (users)=>{
		res.json(users)
	} )
});

db.seed()
.then(()=>{
	app.listen(port, ()=> console.log(`Listening intently on port ${port}`));
})
.catch(e => console.log(e));

