var validator = require('validator');
// hashing module
var crypto = require('crypto');
// add user in database object
var addUser = require('../models/user-schema');
var assert = require('assert');
// database operations object 
var db = require('../models/database-operations');

var colName = 'usersCol';
// to add random string to password then hashing both using SHA512
var rand = require('csprng');

var gravater = require('gravatar');

//var nodemailer = require('nodemailer');

/*var smtpTransport = nodemailer.createTransport("SMTP",{
    auth:{
        user:"user@mail.com",
        passwoord:"**********"
    }
});
*/


// export signup function to be used in any file of project
/*
 * 
 */

exports.signup = function (firstName, lastName, userEmail, userPassword, country,
        city,gender,signcallback) {
           userPassword = String(userPassword);
    
    if (validator.isEmail(userEmail)) {
        if (userPassword.length> 6) {
            if(userPassword.match(/[0-9]/)&&userPassword.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){
                if(userPassword.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)){
            var temp, hashedPassword, newPass, token;
            temp = rand(160, 36);
            newPass = userPassword + temp;
            token = crypto.createHash('sha512').update(userEmail + rand).
                    digest('hex');
            hashedPassword = crypto.createHash('sha512').update(newPass).
                    digest('hex');
            db.find(colName, {'userMail': userEmail}, function (users) {
               
                if (users.length===0) {
                   
                    addUser.createUser(firstName, lastName, userEmail
                            , hashedPassword, country, city,gender, token, temp, function ( user) {
                                
                                db.insert( colName, user);
                                 
                            });
                            signcallback({'res': 'Successfully Registered'});


                } else {
                    signcallback({'res': 'Email Already Registered'});
                }
            });
        }else{
            signcallback({'res':'Password Should be contain at least one special character'});
        }
        }else{
            signcallback({'res':'Password should be contains at least one capital character'});
        }


        } else {
            signcallback({'res': 'Password should be at least 7 digits and charaters '});
        }
    } else {
        signcallback({'res': 'Email Invalid'});
        
    }
};
/*
 * 
 */
exports.login = function(umail,password, callback){
    
    db.find(colName, {userMail:umail}, function(user){
        
        if(user.length!==0){
            var temp = user[0].salt;
            ;
            var hashDb = user[0].userPassword;
            var id = user[0].token;
            var newPass = password + temp;
            var hashedPass = crypto.createHash('sha512').update(String(newPass))
                    .digest("hex");
            var grav_url = gravater.url(umail,{s:'200', r:'pg', d:'404}'});
            if(hashDb == hashedPass){
                db.find(colName,{userId:user[0].id}, function(userDet){
                    callback([{'response':"Login Sucess",'res':true,'token':id,'grav':grav_url},user,userDet]);
                });
                
            }
            else{
                callback({'response':"Invalid Password",'res':false});
            }
        }else{
            callback({'response':"User not exist",'res':false});
        }
    });
};

exports.changePassword = function (id, oldPass,newPassword,callback) {
    var temp1 = rand(166, 36);
    var newPass = newPassword + temp1;
    var nHashedPass = crypto.createHash('sha512').update(newPass).digest('hext');
    db.find( colName, {token:id},function(user){
        if(user){
            var temp = user.salt;
            var hashedDb = user.userPassword;
            var oldNewPass = temp + oldPass;
            var oHashedPass = crypto.createHash('sha512').update(oldNewPass)
                    .digest('hex');
            if(hashedDb == oHashedPass){
                if(String(newPassword).match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)&&
                        Array(newPassword).length > 6 && String(newPassword).
                        match(/0-9/)&&String(newPassword).match(/.[!,@,#,$,%,^,&,*,?,_,~]/)){
                    db.updateOne(colName,
                    "{id:"+id+"},{$set:{salt:"+temp1+",userPassword:"+nHashedPass+"}}"
                            ,function(){
                                callback({'response':"Password Sucessfully Changed",'res':true});
                            });
                    
                        
                  
                        }else{
                            callback({'response':"New Password is Weak. Try a Strong Password !",'res':false});
                        }
            }else{
                callback({'response':"Passwords do not match. Try Again !",'res':false});
            }
        }else{
            callback({'response':"Error while changing password",'res':false});
        }
    });

};

exports.resetPasword = function(){};