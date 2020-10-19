const connection = require('../config/connectDatabase');

if(connection){
    console.log('Successful')
}else{
    console.log('Fail')
}