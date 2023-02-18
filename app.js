//  Start server 

const express = require('express')
const app = express()
const port = 3000
require('dotenv').config();

// Get  Endpoint "Hello World" 

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
  console.log(` server listening on port ${port} `)
})

// Get Endpoint '/status'

app.get('/env', (req, res) => {
  res.send(process.env.ENV)
  console.log(` server listening on port ${process.env.PORT} `)
})

// Get Endpoint '/error' and message 

app.get('/error', (req, res) => {
  res.status(404).json({
      error: {
        code: 404,
        message: "The requested resource was not found.",
        details: "The endpoint you are trying to access could not be found. Please check the URL and try again."
      }
    });
  });



// Get Endpoint '/email-list'


app.get('/email-list', (req, res) => {
  const emails = agents.map(agent => agent.email);
  res.send(emails); 
});
const {agents} = require ('./agents.js');


// Get Endpoint '/region-avg'


app.get('/region-avg', (req, res) => {
  const regions = [...new Set(agents.map(agent => agent.region))]; // new set create a new arrays and remove all duplicate value
  const regionStats = regions.map(region => {
    const filteredAgents = agents.filter(agent => agent.region === region);

    const totalRating = filteredAgents.reduce((acc, agent) => acc + parseInt(agent.rating), 0);
    const totalFee = filteredAgents.reduce((acc, agent) => acc + parseInt(agent.fee), 0);

    const averageRating = (totalRating / filteredAgents.length).toFixed(2);  // toFixed round the value to 2 decimal
    const averageFee = totalFee / (filteredAgents.length).toFixed(2);

    if (filteredAgents.length === 0) {
          return res.status(404).json({ message: 'No agents found in that region.' });
        }

    return { region, averageRating, averageFee };
  });

  res.json(regionStats);
});



// Get Endpoint '/calc-residential'

var calc = require("./calcul.js")

app.get('/calc-residential/:numFloors/:numApts/:tier', (req, res) => {

  var tier = req.params.tier;
  var numApts = parseInt(req.params.numApts);
  var numFloors = parseInt(req.params.numFloors);

  let  elevReq = calc.calcResidentialElev(numFloors, numApts);
  let total = calc.calcInstallFee(elevReq, tier);
 
  res.send({
      elev_req:elevReq,
      total_cost:total
  })

  if(!tier || !["standard", "premium", "excellium"].includes(tier)) {
      return res.status(400).json({ message: "invalid tier" });
  }

  if (isNaN(numApts)  || isNaN(numFloors)) {
     return res.status(400).json({ message: "apartements ad floors must be number"});
  }

  const numAptsInt = parseInt(numApts);
  const numFloorInt = parseInt(numFloors);

  if (!Number.isInteger(numAptsInt) || !Number.isInteger(numFloorInt)) {
     return res.status(400).json({ message : "apartement and floors must be integers"});
  }

  if (numAptsInt <= 0 || numFloorInt <= 0) {
      return res.status(400).json({message: "apartment and floors must be greater than 0"});
  }

 });


app.use(express.json())

// Post Endpoint '/contact-us'

app.post("/contact-us", (req, res,) => {

  const { firstName, lastName, message } = req.body;
  console.log(`Received message from: ${firstName} ${lastName} Message: ${message}`);
  res.send('Thank you for your message');

});


  


