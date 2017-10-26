const moment = require('moment');
const colors = require('colors/safe');


module.exports = {
    
      info: function(str) {
        
        console.log(colors.green('[' + moment().format('MMMM Do YYYY, h:mm:ss a') + ']' + ' INFO :: ' + str ));
      },
    
      err: function(str){
        console.log(colors.red('[' + moment().format('MMMM Do YYYY, h:mm:ss a') + ']' + ' ERR :: ' + str ));
      }
    
}