const message = document.getElementById('message');

const handler = async ({ key, target }, object) => {
  if(key !== 'Enter') return;
  let input = target.value
  let { data } = await axios.get('/new', { params: { input } });

  if(data.results) {
  	message.textContent = 'Shortened URL: ' + document.URL + data.id;
  } else {
  	message.textContent = 'Not Valid URL. Please try again';
  }
  target.value = '';
 };