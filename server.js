const express = require('express');

const app = express();
const PORT = process.env.PORT || 3306;

const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log('App listening on PORT ' + PORT);
    });
  });
  