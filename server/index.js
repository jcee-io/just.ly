const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const validator = require('validator');
const redis = Promise.promisifyAll(require('redis'));
const shortid = require('shortid');

const app = express();
const client = redis.createClient(process.env.REDIS_URL || 6379);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client'));

app.get('/new', async (req,res) => {
	if(!req.query) {
		res.send('Not A Valid URL');
		return;
	}
	let results = true;
	let id = shortid.generate();
	let input = req.query.input;

	if(!validator.isURL(input)) {
		results = false; 
		id = null;
	} else {
		await client.setAsync(id, input)	  	
	}

	res.json({ results, id, input });
});

app.get('/:id', async (req,res) => {
	let URL = await client.getAsync(req.params.id);

	if(!URL) {
		res.send('Not A Valid URL');
	}

	const hasHyperlink = URL.slice(0,7) === 'http://' || URL.slice(0,8) === 'https://';

	if(!hasHyperlink) {
		URL = 'http://' + URL;
	}

	res.statusCode = 302;
	res.setHeader('Location', URL);
	res.end();	
});

app.get('*', (req, res) => {
	res.send('Not A Valid URL');
});

app.listen(process.env.PORT || 3000);