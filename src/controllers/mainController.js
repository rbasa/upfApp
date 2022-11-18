const path = require('path');
const fs = require('fs');


const controller = {
  index: (req, res) => {
    return(res.render('home'))
  }  
};
module.exports = controller;
