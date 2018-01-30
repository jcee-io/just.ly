const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const redis = Promise.promisifyAll(require('redis'));

const app = express();
const client = redis.createClient(6379);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client'));

app.get('/new', async (req,res) => {
	let value = await client.getAsync(req.query);
});
app.listen(process.env.PORT || 3000);