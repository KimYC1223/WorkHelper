module.exports = function (app) {
    let fs = require('fs')

    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);


    app.get('/', (req,res) => {
      res.render(__dirname+'/EJS/index.ejs')
    })

    app.get('/get_percent', (req,res) => {
      res.render(__dirname+'/EJS/get_percent.ejs')
    })
  }
