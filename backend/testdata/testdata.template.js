// Nimeä uudelleen testdata.js -nimiseksi

const User = require('../models/User');
const Movie = require('../models/Movie');
const dbConfig = require('../config/database.config');
const mongoose = require('mongoose');
const movies = require('./moviesdata');

/*
 * Tämän tiedoston avulla voidaan luoda tarvittavaa mallidataa,
 * jotta sivuston toimintaa voisi demota helpommin.
 * Tämän tiedoston ajamalla luodaan adminkäyttäjä sekä
 * mallielokuvia kantaan. 
 * 
 * Admin-käyttäjää ei voida luoda
 * sovelluksen sisältä tällä hetkellä, joten adminoikeudellinen
 * käyttäjä pitää luoda joko tämän tiedoston avulla tai
 * manuaalisesti vaihtamalla kantaan rekisteröidyn käyttäjän
 * isAdmin-arvo true:ksi.
 * 
 * HUOM!
 * Aja tämä tiedosto nodella erikseen, älä lisää sitä app.js:ään tai
 * minnekään muualle backendin ajoon!
 */

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database connection established');
}).catch((err) => {
  console.log('Could not connect to database, exiting', err);
  process.exit();
});

// Luodaan admin-käyttäjä admintoimintojen testaamista varten
const user = new User();

// käyttäjänimi
user.username = '';

// sähköposti ja samalla kirjautumistunnus
user.email = '';

// salasana
user.password = user.generateHash();

// rekisteröitymis- ja adminflagit
user.isRegistered = true;
user.isAdmin = true;

user.save()
    .then(() => {
        movies.forEach(entry => {
            const movie = new Movie();
            movie.title = entry.title;
            movie.year = entry.year;
            movie.director = entry.director;
            if (movies.indexOf(entry) === movies.length - 1) {
                movie.save()
                    .then(() => {
                        process.exit();
                    });
            } else {
                movie.save();
            }
        })
    });