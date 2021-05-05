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
function dsYeuCauCuuHo(ID_TaiKhoan, TrangThai) {
    if (ID_TaiKhoan && TrangThai) {
        var defer = q.defer();
        conn.query("SELECT * FROM YeuCauCuuHo, doitac WHERE YeuCauCuuHo.ID_DoiTac=doitac.ID_DoiTac AND YeuCauCuuHo.TrangThai=? AND ID_TaiKhoan=?",[TrangThai,ID_TaiKhoan], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function dsHinhAnhYeuCau(ID_YeuCau) {
    if (ID_YeuCau) {
        var defer = q.defer();
        conn.query("SELECT * FROM HinhAnhCuuHo WHERE ID_YeuCau =?",[ID_YeuCau], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function themYeuCauCuuHo(data) {
    if (data) {
        var defer = q.defer();
        conn.query("INSERT INTO YeuCauCuuHo SET ?",[data], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getIDYeuCau(ID_TaiKhoan, ID_DoiTac) {
    if (ID_TaiKhoan && ID_DoiTac) {
        var defer = q.defer();
        conn.query("select ID_YeuCau from YeuCauCuuHo where ? order by ThoiGian DESC limit 1",[ID_TaiKhoan, ID_DoiTac], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function themHinhAnhCuuHo(data) {
    if (data) {
        var defer = q.defer();
        conn.query("INSERT INTO HinhAnhCuuHo SET ?",[data], function (error, results) {
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
    changePassword: changePassword,
    dsYeuCauCuuHo: dsYeuCauCuuHo,
    dsHinhAnhYeuCau: dsHinhAnhYeuCau,
    themYeuCauCuuHo: themYeuCauCuuHo,
    themHinhAnhCuuHo: themHinhAnhCuuHo,
    getIDYeuCau: getIDYeuCau
}