'use strict'

var express = require('express');
var app = express();
var mcache = require('memory-cache');

app.locals.env = process.env;
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'jade');


var cache = (duration) => {
  return (req, res, next) => {
    let key = ('__express__' + req.originalUrl).split('?')[0] || req.url.split('?')[0]
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(JSON.parse(cachedBody))
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/user_cache', cache(60 * 10), (req, res) => {
    const pippo = req.query.id;
    if (pippo== 1) {
      res.json({ id: 1, name: "Leonardo", color: "rosso", timestamp: Date.now()})
    } else if (pippo == 2) {
      res.json({ id: 2, name: "Donatella", color: "verde", timestamp: Date.now()})
    } else if (pippo == 3) {
      res.json({ id: 3, name: "Michelangela", color: "blu", timestamp: Date.now()})
    }
})

app.get('/user', (req, res) => {
    const pippo = req.query.id;
    if (pippo== 1) {
      res.json({ id: 1, name: "Leonardo", color: "rosso", timestamp: Date.now()})
    } else if (pippo == 2) {
      res.json({ id: 2, name: "Donatella", color: "verde", timestamp: Date.now()})
    } else if (pippo == 3) {
      res.json({ id: 3, name: "Michelangela", color: "blu", timestamp: Date.now()})
    }
})

app.use((req, res) => {
  res.status(404).send('') //not found
})

const PORT_PIPPO = process.env.PORT || 3000;

app.listen( PORT_PIPPO, () => {
  console.log(`Example app listening on port ${PORT_PIPPO}!`)
})
