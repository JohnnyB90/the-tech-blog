// server.js
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const path = require('path');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;



//init handlebars
const hbs = exphbs.create();


const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.engine ('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sess));
app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on port at http://localhost:${PORT}/`));
});
