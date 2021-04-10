var config = require("config");

function kiemTraDangNhap(req) {
    if (req.session.User) {
        return true;
    }
    return false;
}

function getSessionUser(req) {
    if (req.session.User) {
        return req.session.User;
    }
    return false;
}

function setSessionDangNhap(req) {
    req.session.User = {
        hoten: "Đặng Minh Hiếu",
        username: "hieugiddy",
        quyen: "1",
        avatar: "/static/img/avatar.png"
    }
}
function passwordValidation(password){
    var passwordValidator = require('password-validator');
 
    // Create a schema
    var schema = new passwordValidator();
     
    // Add properties to it
    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
     
    return schema.validate(password);
}
function telephoneValidation(telephone){
    var passwordValidator = require('password-validator');
    var schema = new passwordValidator();
    schema
    .is().min(10)                                    // Minimum length 10
    .is().max(11)                                  // Maximum length 11
    .has().digits(10)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    return schema.validate(telephone);
}
function usernameValidation(username){
    var passwordValidator = require('password-validator');
    var schema = new passwordValidator();
    schema
    .is().min(1)                                    
    .is().max(20)                                  
    .has().not().spaces()                           
    return schema.validate(username);
}
module.exports = {
    kiemTraDangNhap: kiemTraDangNhap,
    setSessionDangNhap: setSessionDangNhap,
    getSessionUser: getSessionUser,
    passwordValidation: passwordValidation,
    telephoneValidation: telephoneValidation,
    usernameValidation: usernameValidation
}