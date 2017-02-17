// hashing module
var crypto = require('crypto');
// add user in database object
var addUser = require('../models/user-schema');
var assert = require('assert');
// database operations object 
var db = require('../models/database-operations');
var dbName = 'locationappdb';
var colName ='usersCol';
// to add random string to password then hashing both using SHA512
var rand = require('csprng');

var gravater = require('gravatar');

// export signup function to be used in any file of project
/*
 * 
 */
exports.signup = function(firstName,lastName,userEmail, userPassword,country,
city,callback){
    var email = userEmail;
    if ((email.indexOf('@')!==email.length)){
        if (userPassword.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/&& 
                userPassword.length >6)){
            var temp, hashedPassword,newPass, token;
            temp = rand(160,36);
            newPass = userPassword + temp;
            token = crypto.createHash('sha512').update(userEmail + rand).
                    digest('hex');
            hashedPassword = crypto.createHash('sha512').update(newPass).
                    digest('hex');
            db.find(dbName,colName,{'userMail':userEmail},function(users){
                var len = users.length;
                if (len === 0){
                    addUser.createUser(firstName,lastName,userEmail
                    ,hashedPassword,country,city,token,temp,function(err,user){
                        assert.equal(null,err);
                        db.insert(dbName, colName,user);
                        callback({'res':'Successfully Registered'});
                    });
                     
                    
                }else{
                    callback({'res':'Email Already Registered'});
                }
            });
           
            
                }else{
                    callback({'res':'Password Weak '});
                }
    }else{
        callback({'res':'Email Invalid'});
    }
};
/*
 * 
 */
exports.login = function(userEmail, userPass, loginCallback){
    db.find(dbName, colName, {'userMail':userEmail},function(err,user){
       if(user.length!== 0){
           var temp = user[0].salt;
           var dbHasehd = user[0].userPassword;
           var userToken = user[0].token;
           var newPass = temp + userPass;
           var hashedPassword =crypto.createHash('sha512').update(newPass)
                   .digest('hex');
           var gravUrl = gravater.url(userEmail,{s:'200',r:'pg',d:404});
           if(dbHasehd === hashedPassword){
               loginCallback({'response':'Login Success','res':true,
                   'token':userToken,'grav':gravUrl});
           }else{
               loginCallback({'response':'Invalid Password','res':false});
           }
       }else{
           loginCallback({'response':'User Not Exist','res':false});
       }
        
    });
};

exports.changePassword = function(){
    
};