const express = require('express');
const app = express();

app.use(express.json);

const courses = [
	{id: 1, name:"course1"},
	{id: 2, name:"course2"},
	{id: 3, name:"course3"}
];

app.get('/', (req, res) => {
	res.send('Born to WIN');
});

app.get('/api/courses/', (req, res) => {
	res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
	const course = courses.find(course => course.id === parseInt(req.params.id));
	if(!course) res.status(404).send('Course NOT FOUND');
	res.send(course);
});

app.post('/api/courses', (req, res)=>{
	if(!req.body.name || req.body.name.length < 3){
		// 400
		res.status(400).send("Name Required; Name Minimum 3 char")
	}

	const course ={
		id: courses.length+1,
		name: req.body.name
	};

	courses.push(course);
	res.send(courses);
});

// app.get('/api/posts/:year/:month', (req, res) => {
// 	res.send(req.params);
// });

// app.get('/api/posts/:year/:month', (req, res) => {
// 	res.send(req.query);
// });

const port = process.env.port || 3000;
app.listen(port, ()=> console.log(`Listening PORT : ${port}`));
