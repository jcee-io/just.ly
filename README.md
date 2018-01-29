# URL Shortener Service
## System Design

The following design will be implemented in this microservice with a few exceptions. Rather than creating multiple servers, to keep it at a smaller scale, makeshift microservices will be created using different files and functions. Although, future developments will allow a creation of the system architecture with multiple microservices, and load balancing.

![System Design](https://ci6.googleusercontent.com/proxy/x-3Jp_bcsDe1fEX4C-rzKuUXGFbR57F8INu4kwJrh_BvrbolJ06iMAW2_sIaGcnQm0l87Aym4CO-q10J73Hftz19Pq3mnzsJBO4D3o1oWdpIyxMarY-fUFSLL-ptdBkEbITHYhfAwqxA39AAnC67CgUCzmOSwAoz5-pnTLk6RcEzCxT7gUVRFDgC1z2n6ZnCtwQXhAo4CTRgGpEPaokFXLcrx5W_GetSEn5njwSjrvT1sQt4TB8GBxKJ1aUNMjOx0gJ6ZV46whot_431toygZJdJNL4b99h74kWL6LpEieKILzRsPTxtHhg0rCCfDw=s0-d-e1-ft#https://documents.lucidchart.com/documents/737ee494-3a9e-4e0a-9ab4-f62a99e9f4cb/pages/0_0?a=1323&x=36&y=-200&w=1649&h=1760&store=1&accept=image%2F*&auth=LCA%20d02cc3399655e9403ff54aacc0a40052ae7370b5-ts%3D1515273309)

## Technology

In accordance to the system design there are several technologies that we are using to interact with one another, and to manipulate the flow of fate. The following technologies that are going to be used are:

### Express

This will be the backbone of our service, we will have two routes, two GET requests that serve different functions. One is to create the URL, and the other is to serve using the shortened URL. 

### Redis

We will be using the key-value function of this cache/store to store/acquire our URL using the shortened ID as our key. In order to use in the internet, a third-party Redis server might be needed. Redis Labs is going to be used to complete this project

## ShortId

This will be our endpoint generation for the shortened url, and our key for the actual url to be stored in Redis.