const express = require('express')
const querystring= require('querystring')
const request = require('request');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var accestokenVar="";
const app = express()
const port = 3001
const ColorThief = require('colorthief');
const resolve= require('resolve');

/************vars for Spotify*****************/
var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret=  process.env.SPOTIFY_CLIENT_SECRET;
var redirect_uri = `http://localhost:${port}/callback`;
/*************authentication*****************/
app.use(session({
    name: 'secretkeys Spotify',
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 3600000, // 1hr
      secure: true, // cookie is only accessible over HTTP, requires HTTPS
    }
}));

/****************************/
app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());


require('dotenv').config()

function generateRandomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/trackData', (req, res) => {
 console.log("get track data requested...")
  var options = {
          url: 'https://api.spotify.com/v1/me/top/tracks?limit=10',
          headers: { 'Authorization': 'Bearer ' + accestokenVar },
          json: true
        };
        request.get(options, function(error, response, body) {
        if (error) {
          console.error(error);
          return;
          }
          if (response.statusCode !== 200) {
          console.error('Invalid status code:', response.statusCode);
          return;
          }
          //res.send(JSON.stringify(body, null, 2))
          res.json(body)
        });
        
});

app.get('/artistData', (req, res) => {
 console.log("get artist data requested...")
  var options = {
          url: 'https://api.spotify.com/v1/me/top/artists?limit=10',
          headers: { 'Authorization': 'Bearer ' + accestokenVar },
          json: true
        };
        request.get(options, function(error, response, body) {
        if (error) {
          console.error(error);
          return;
          }
          if (response.statusCode !== 200) {
          console.error('Invalid status code:', response.statusCode);
          return;
          }
          //res.send(JSON.stringify(body, null, 2))
          res.json(body)
        });
        
});

var stateKey = 'spotify_auth_state';

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-top-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

      req.session.access_token = access_token;
      req.session.refresh_token = refresh_token;
      accestokenVar=access_token;

      
  
        var options = {
          url: 'https://api.spotify.com/v1/me/top/tracks?limit=1',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        request.get(options, function(error, response, body) {
        if (error) {
          console.error(error);
          return;
          }
          if (response.statusCode !== 200) {
          console.error('Invalid status code:', response.statusCode);
          return;
          }
        });
        
       
        res.redirect('http://localhost:3000/resultpage/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});


app.get('/dominantcolor/:imagelink', (req, res) => {
 try {
    console.log('Dominant color searched...');

    const imageUrl = req.params.imagelink;
    //const imageUrl = decodeURIComponent(req.params.imagelink);

    ColorThief.getColor(imageUrl)
      .then((color) => {
        console.log('Dominant Color (RGB):', color);
        //res.send(`Dominant Color (RGB): ${color}`);
      })
      .catch((error) => {
        console.error('Error:', error);
        //res.status(500).send('Error retrieving the dominant color');
      });
  } catch (error) {
    console.error('Error:', error);
    //res.status(500).send('Error retrieving the dominant color');
  }

})

