
var validator = require('validator');

// hashing module
var crypto = require('crypto');
// add user in database object
var addUser = require('../models/user-schema');
// database operations object 
var db = require('../models/database-operations');

var colName = 'usersCol';
// to add random string to password then hashing both using SHA512
var rand = require('csprng');

var gravater = require('gravatar');

var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
    auth: {
        user: "mohamedsalah929@gmail.com",
        password: "20819942021995"
    }
});



// export signup function to be used in any file of project
/*
 * 
 */

exports.signup = function (firstName, lastName, userEmail, userPass, birthdate, country,
        city, gender, signcallback) {
    var userPassword = String(userPass);

    if (validator.isEmail(userEmail)) {

            if (userPassword.length > 6) {
                if (userPassword.match(/[0-9]/) && userPassword.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
                    if (userPassword.match(/.[!,@,#,$,%,^,&,*,?,_,~,+,-,/,.]/)) {
                        var temp, hashedPassword, newPass, token;
                        temp = rand(160, 36);
                        newPass = userPassword + temp;
                        token = crypto.createHash('sha512').update(userEmail + rand).
                                digest('hex');
                        hashedPassword = crypto.createHash('sha512').update(newPass).
                                digest('hex');
                        db.find(colName, {'userMail': userEmail}, function (users) {

                            if (users.length === 0) {

                                addUser.createUser(firstName, lastName, userEmail
                                        , hashedPassword, birthdate, country, city, gender, token, temp, function (user) {

                                            db.insert(colName, user);

                                        });
                                signcallback({'res': 'Successfully Registered'});


                            } else {
                                signcallback({'res': 'Email Already Registered'});
                            }
                        });
                    } else {
                        signcallback({'res': 'Password Should be contain at least one special character'});
                    }
                } else {
                    signcallback({'res': 'Password should be contains at least one capital character'});
                }

            } else {
                signcallback({'res': 'Password should be at least 7 digits and charaters '});
            }
        } else {
        signcallback({'res': 'Your email is invalid'});
    
        }
     

};
/*
 * 
 */
exports.login = function (umail, password, callback) {

    db.find(colName, {userMail: umail}, function (user) {

        if (user.length != 0) {
            var temp = user[0].salt;
            var hashDb = user[0].userPassword;
            var id = user[0].token;
            var newPass = password + temp;
            var hashedPass = crypto.createHash('sha512').update(String(newPass))
                    .digest("hex");
            var grav_url = gravater.url(umail, {s: '200', r: 'pg', d: '404}'});
            if (hashDb === hashedPass) {
                db.find(colName, {userId: user[0].id}, function (userDet) {
                    callback([{'response': "Login Sucess", 'res': true, 'token': id, 'grav': grav_url}, user, userDet]);
                });

            } else {
                callback({'response': "invalid Password", 'res': false});
            }
        } else {
            callback({'response': "User not exist", 'res': false});
        }
    });
};

exports.changePassword = function (id, oldPass, newPassword, callback) {
    var temp1 = rand(166, 36);
    var newPass = newPassword + temp1;
    var nHashedPass = crypto.createHash('sha512').update(newPass).digest('hext');
    db.find(colName, {token: id}, function (user) {
        if (user.length != 0) {
            var temp = user[0].salt;
            var hashedDb = user[0].userPassword;
            var oldNewPass = oldPass + temp;
            var oHashedPass = crypto.createHash('sha512').update(oldNewPass)
                    .digest('hex');
            if (hashedDb === oHashedPass) {
                if (String(newPassword).match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) &&
                        Array(newPassword).length > 6 && String(newPassword).
                        match(/0-9/) && String(newPassword).match(/.[!,@,#,$,%,^,&,*,?,_,~,+,-,/,.]/)) {
                    db.updateOne(colName,
                            {id: id}, {$set: {salt: temp1, userPassword: nHashedPass}}
                    , function () {
                        callback({'response': "Password Sucessfully Changed", 'res': true});
                    });



                } else {
                    callback({'response': "New Password is Weak. Try a Strong Password !", 'res': false});
                }
            } else {
                callback({'response': "Passwords do not match. Try Again !", 'res': false});
            }
        } else {
            callback({'response': "Error while changing password", 'res': false});
        }
    });

};

exports.resetPasword = function (email, callback) {

    db.find(colName, {userMail: email}, function (user) {
        if (user[0].length != 0) {
            var tempStr = rand(24, 24);
            db.updateOne(colName, {userMail: email}, {$set: {tempCode: tempStr}}, function () {
                var mailOtion = {
                    from: "mohamedsalah929@gmail.com",
                    to: email,
                    subject: "Reset Password",
                    text: "Hello" + email + "code to reset your password is "
                            + tempStr + ".nn Regards,nMohamed Salah, Locware Team"
                };
                smtpTransport.sendMail(mailOtion, function (err) {
                    if (err) {
                        callback({'response': "Error While Resetting password. Try Again !", 'res': false});

                    } else {
                        callback({'response': "Check your Email and enter the verification code to reset your Password.", 'res': true});
                    }
                });
            });
        } else {
            callback({'response': 'Email does not exist', 'res': false});
        }
    });
};
exports.resetChangePass = function (email, code, nPass, callback) {
    db.find(colName, {userMail: email}, function (user) {
        if (user.length !== 0) {
            var tempStr = user[0].tempCode;
            var temp = rand(160, 36);
            var newPass = nPass + temp;
            var hashedPassword = crypto.createHash('sha512').update(newPass).
                    digest('hex');
            if (tempStr == code) {
                if (nPass.length > 6) {
                    if (nPass.match(/[0-9]/) && nPass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
                        if (nPass.match(/.[!,@,#,$,%,^,&,*,?,_,~,+,-,/,.]/)) {
                            db.updateOne(colName, {userMail: email}, {$set: {userPassword: hashedPassword}},
                                    {$set: {salt: temp}}, {$set: {tempCode: ""}}, function () {
                                callback({'response': 'Password changed successfully '});
                            });
                        } else {
                            callback({'response': 'Password should be contains at least one special character'});
                        }
                    } else {
                        callback({'response': 'Password should be contains at least one capital character'});
                    }
                } else {
                    callback({'response': 'Your password should be greater than 6 digits or character'});
                }
            }
        }
    });

};

exports.confirmUser = function(email,callback){
    var tempStr = rand(24,24);
    db.updateOne(colName,{userMail:email},{$set:{tempCode:tempStr}},function(){
        var mailOtion = {
                    from: "mohamedsalah929@gmail.com",
                    to: email,
                    subject: "Reset Password",
                    text: "Hello" + email + "code to reset your password is "
                            + tempStr + ".nn Regards,nMohamed Salah, Locware Team"
                };
                smtpTransport.sendMail(mailOtion,function(err){
                    if(err){
                        callback({'response':'there is problem try again to resend confirmation code'});
                    }else{
                        callback({'response':'confirmation code sent'});
                    }
                });
    });
};