const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const validator = require('validator');
const redis = Promise.promisifyAll(require('redis'));
const shortid = require('shortid');

const app = express();
const client = redis.createClient(6379);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client'));

app.get('/new', (req,res) => {
	//let value = await client.getAsync(req.query);
	let results = true;
	let id = shortid.generate();
	let input = req.query.input;

	console.log(id, input);
	if(!validator.isURL(input)) {
		results = false; 
		id = null;
		res.json({ results, id, input });
	} else {
		client.setAsync(id, input)
		  .then(() => {
		  	res.json({ results, id, input });
		  });
	}
});

app.get('/:id', (req,res) => {
	client.get(req.params.id, (err, URL) => {
		const hasHyperlink = URL.slice(0,7) === 'http://' || URL.slice(0,8) === 'https://';

		if(!hasHyperlink) {
			URL = 'http://' + URL;
		}

		if(err) {
			console.log(err);
			res.end();
		} else {
			res.statusCode = 302;
			res.setHeader('Location', URL);
			res.end();
		}
	});
});
app.listen(process.env.PORT || 3000);