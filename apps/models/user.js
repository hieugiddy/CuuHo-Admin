var q = require("q");
var db = require("../common/DB");
var conn = db.getConnection();

function addUser(user) {
    if (user) {
        var defer = q.defer();
        conn.query('INSERT INTO taikhoan SET ?', user, function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function xuLiLogin(username,password) {
    if (username && password) {
        var defer = q.defer();
        conn.query("SELECT * FROM taikhoan WHERE TenDangNhap=? and MatKhau=?",[username,password], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function uploadAvatar(id, path) {
    if (id && path) {
        var defer = q.defer();
        conn.query("UPDATE taikhoan SET HinhDaiDien=? WHERE ID_TaiKhoan=?",[path,id], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function updateUser(id, user) {
    if (id && user) {
        var defer = q.defer();
        conn.query("UPDATE taikhoan SET ? WHERE ID_TaiKhoan=?",[user,id], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function changePassword(id, password) {
    if (id && password) {
        var defer = q.defer();
        conn.query("UPDATE taikhoan SET MatKhau=? WHERE ID_TaiKhoan=?",[password,id], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
module.exports = {
    addUser: addUser,
    xuLiLogin: xuLiLogin,
    uploadAvatar: uploadAvatar,
    updateUser: updateUser,
    changePassword: changePassword
}