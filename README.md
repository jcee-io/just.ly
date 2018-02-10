# URL Shortener Service
## System Design

Live Link: https://just-ly.herokuapp.com/

WARNING: Do not use this application to save all of your URLs. There is no data persistence in this free Redis plan. Your links will expire.

The following design will be implemented in this microservice with a few exceptions. Rather than creating multiple servers, to keep it at a smaller scale, makeshift microservices will be created using different files and functions. Although, future developments will allow a creation of the system architecture with multiple microservices, and load balancing.

![System Design](https://ci6.googleusercontent.com/proxy/x-3Jp_bcsDe1fEX4C-rzKuUXGFbR57F8INu4kwJrh_BvrbolJ06iMAW2_sIaGcnQm0l87Aym4CO-q10J73Hftz19Pq3mnzsJBO4D3o1oWdpIyxMarY-fUFSLL-ptdBkEbITHYhfAwqxA39AAnC67CgUCzmOSwAoz5-pnTLk6RcEzCxT7gUVRFDgC1z2n6ZnCtwQXhAo4CTRgGpEPaokFXLcrx5W_GetSEn5njwSjrvT1sQt4TB8GBxKJ1aUNMjOx0gJ6ZV46whot_431toygZJdJNL4b99h74kWL6LpEieKILzRsPTxtHhg0rCCfDw=s0-d-e1-ft#https://documents.lucidchart.com/documents/737ee494-3a9e-4e0a-9ab4-f62a99e9f4cb/pages/0_0?a=1323&x=36&y=-200&w=1649&h=1760&store=1&accept=image%2F*&auth=LCA%20d02cc3399655e9403ff54aacc0a40052ae7370b5-ts%3D1515273309)

## Technology
In accordance to the system design there are several technologies that we are using to interact with one another, and to manipulate the flow of fate. The following technologies that are going to be used are:

### ES6/ES7

Though some ES6 is used such as destructuring and arrow functions, the most notable use of this is ES7's async and await to promote cleanliness in the syntax.

### Axios
This is used on the client side, and is actually using a CDN online. This is to make requests to the server with the input entry.

### Validator

This is used to validate whether or not a website is valid. I've tried other modules that do the same thing, but there are some valid website entries that were marked as invalid. This particular module has been the most reliable one.

NOTE: This module only evaluates the syntax of your website, it does not send a request checking whether or not there is a 404 error.

### Body-Parser

This is a middleware used in order to parse and populate the request with either the body, params, or query property (depending on the request) in order to promote cleanliness and convenience in the code.

### Bluebird

This is used to promisify the Redis methods (which are asynchronous), and utilize async and await from ES7 to simplify the Express callbacks and treat everything as if it was synchronous.

### Express

This will be the backbone of our service, we will have two routes, two GET requests that serve different functions. One is to create the URL, and the other is to serve using the shortened URL. 

### Redis

We will be using the key-value function of this cache/store to store/acquire our URL using the shortened ID as our key. In order to use in the internet, a third-party Redis server might be needed. Redis Labs is going to be used to complete this project

### ShortId

This will be our endpoint generation for the shortened url, and our key for the actual url to be stored in Redis.