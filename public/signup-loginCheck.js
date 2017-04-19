var profileOpertaions = require('./profileOperations');
var validator = require('validator');
var xoauth2 = require('xoauth2');
// hashing module
var crypto = require('crypto');
// add user in database object
var addUser = require('../models/userPlace-schema');
// database operations object 
var db = require('../models/database-operations');

var colName = 'usersCol';
// to add random string to password then hashing both using SHA512
var rand = require('csprng');

var gravater = require('gravatar');

var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,
    port: 25,
    auth: {
        user: "mohamedsalah929@gmail.com",
        pass: "20819942021995"
    },
    tls: {
        rejectUnauthorized: false
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

                                        var tempStr = rand(24, 24);
                                        db.updateOne(colName, {userMail: userEmail}, {$set: {tempCode: tempStr}}, function () {
                                            var mailOption = {
                                                from: "<mohamedsalah929@gmail.com>",
                                                to: userEmail,
                                                subject: "Account activation",
                                                html: "Hello " + userEmail + " code to activate your account is \n" +
                                                        "<h3>" + tempStr + "</h3>" + "\n <q>Regards,Mohamed Salah, &amp Locware Team</q>"
                                            };
                                            smtpTransport.sendMail(mailOption, function (err) {
                                                if (err) {
                                                    signcallback({'res': err});
                                                } else {
                                                    signcallback({'res': 'Successfully Registered, activation code has been sent'});
                                                }
                                            });
                                        });


                                    });




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

    db.findProjection(colName, {userMail: umail}, {tempCode: 0, _id: 0}, function (user) {
        if (user.length != 0) {
            var temp = user[0].salt;
            var hashDb = user[0].userPassword;
            var id = user[0].token;
            var newPass = password + temp;
            var hashedPass = crypto.createHash('sha512').update(String(newPass))
                    .digest("hex");
            var grav_url = gravater.url(umail, {s: '200', r: 'pg', d: '404}'});
            if (hashDb === hashedPass) {
                db.findProjection(colName, {token: id}, {favoritList: 0,
                    visitedPlces: 0, checkIns: 0, userAddress: 0, userGender: 0, userPassword: 0, tempCode: 0, userBirthdate: 0, salt: 0, token: 0, userMail: 0, name: 0}, function (data) {



                    callback({'response': "Login Sucess", 'res': true, 'token': id, userId: data, 'grav': grav_url});


                });



            } else {
                callback([{'response': "invalid Password", 'res': false}]);
            }
        } else {
            callback([{'response': "User not exist", 'res': false}]);
        }
    });
};

exports.changePassword = function (userId, oldPass, newPassword, callback) {
    var temp1 = rand(166, 36);
    var newPass = newPassword + temp1;
    var nHashedPass = crypto.createHash('sha512').update(newPass).digest('hext');
    db.find(colName, {_id: userId}, function (user) {
        var nPass = String(newPass);
        if (user.length != 0) {
            var temp = user[0].salt;
            var hashedDb = user[0].userPassword;
            var oldNewPass = oldPass + temp;
            var oHashedPass = crypto.createHash('sha512').update(oldNewPass)
                    .digest('hex');
            if (hashedDb === oHashedPass) {
                if (nPass.length > 6) {

                    if (nPass.
                            match(/[0-9]/) && nPass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {


                        if (nPass.match(/.[!,@,#,$,%,^,&,*,?,_,~,+,-,/,.]/)) {

                            db.updateOne(colName,
                                    {_id: userId}, {$set: {salt: temp1, userPassword: nHashedPass}}
                            , function () {
                                callback({'response': "Password Sucessfully Changed", 'res': true});
                            });



                        } else {
                            callback({'response': "PasswordPassword Should be contain at least one special character"});
                        }
                    } else {
                        callback({'response': 'Password should be contains at least one capital character'});
                    }
                } else {
                    callback({'response': 'Password should be more than 6 digits and characters'});
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
                    text: "Hello" + email + "code to reset your password is\n "
                            + tempStr + "\n Regards,Mohamed Salah, Locware Team"
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

exports.confirmUser = function (email, callback) {
    var tempStr = rand(24, 24);
    db.updateOne(colName, {userMail: email}, {$set: {tempCode: tempStr}}, function () {
        var mailOtion = {
            from: "mohamedsalah929@gmail.com",
            to: email,
            subject: "Reset Password",
            text: "Hello" + email + "code to reset your password is\n "
                    + tempStr + "\n Regards,Mohamed Salah, Locware Team"
        };
        smtpTransport.sendMail(mailOtion, function (err) {
            if (err) {
                callback({'response': 'there is problem try again to resend confirmation code'});
            } else {
                callback({'response': 'confirmation code sent'});
            }
        });
    });
};

exports.confirmatioCodeAcceptance = function (email, confirmationCode, callback) {
    db.findProjection(colName, {userMail: email}, {_id: 0, name: 0, userAddress: 0, userGender: 0, favoritList: 0,
        visitedPlces: 0, checkIns: 0, userBirthdate: 0, salt: 0, token: 0, userMail: 0, userPassword: 0}, function (code) {


        if (confirmationCode == code[0].tempCode) {
            callback({'response': 'done'});
        } else {
            callback({'response': 'your confirmation code incorrect'});
        }
    });
};
