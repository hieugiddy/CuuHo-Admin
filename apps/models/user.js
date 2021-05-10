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
        var TrangThai = TrangThai.split(',');
        var defer = q.defer();
        conn.query("SELECT ID_YeuCau, LiDoCuuHo, MoTaYeuCau, DiaDiemCuuHo, ThoiGian, TrangThai FROM yeucaucuuho WHERE TrangThai IN (?) AND ID_TaiKhoan=? ORDER BY ThoiGian DESC",[TrangThai,ID_TaiKhoan], function (error, results) {
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
        conn.query("SELECT * FROM hinhanhcuuho WHERE ID_YeuCau =?",[ID_YeuCau], function (error, results) {
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
        conn.query("INSERT INTO yeucaucuuho SET ?",[data], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getIDYeuCau(ID_TaiKhoan, ID_ChiNhanh) {
    if (ID_TaiKhoan && ID_ChiNhanh) {
        var defer = q.defer();
        conn.query("select ID_YeuCau from yeucaucuuho where ? order by ThoiGian DESC limit 1",[ID_TaiKhoan, ID_ChiNhanh], function (error, results) {
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
        conn.query("INSERT INTO hinhanhcuuho SET ?",[data], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getChiTietYeuCauCuuHo(ID_YeuCau) {
    if (ID_YeuCau) {
        var defer = q.defer();
        conn.query("SELECT LiDoCuuHo, MoTaYeuCau, DiaDiemCuuHo, TongChiPhi, MoTaChiPhi, ThoiGian, yeucaucuuho.TrangThai, TenDoanhNghiep, chinhanh.NgayHoatDong, Website, TenChiNhanh, DiaChi, chinhanh.ViDo, chinhanh.KinhDo, yeucaucuuho.ViDo, yeucaucuuho.KinhDo, yeucaucuuho.ID_TaiKhoan, yeucaucuuho.ID_ChiNhanh FROM yeucaucuuho, doitac, chinhanh WHERE yeucaucuuho.ID_ChiNhanh=chinhanh.ID_ChiNhanh AND chinhanh.ID_DoiTac=doitac.ID_DoiTac AND ID_YeuCau=?",[ID_YeuCau], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function setTrangThaiYeuCau(ID_YeuCau, TrangThai) {
    if (ID_YeuCau) {
        var defer = q.defer();
        conn.query("UPDATE yeucaucuuho SET TrangThai=? WHERE ID_YeuCau=?",[TrangThai,ID_YeuCau], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function chiPhiYeuCauCuuHo(ID_YeuCau, MoTaChiPhi, TongChiPhi) {
    if (ID_YeuCau && MoTaChiPhi && TongChiPhi) {
        var defer = q.defer();
        conn.query("UPDATE yeucaucuuho SET MoTaChiPhi=?, TongChiPhi=? WHERE ID_YeuCau=?",[MoTaChiPhi,TongChiPhi,ID_YeuCau], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function addDanhGia(data) {
    if (data) {
        var defer = q.defer();
        conn.query("INSERT INTO danhgia SET ?",[data], function (error, results) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getChiTietDanhGia(idTK,ID_ChiNhanh){
    if (idTK && ID_ChiNhanh) {
        var defer = q.defer();
        conn.query('SELECT * FROM danhgia WHERE ID_ChiNhanh=? and ID_TaiKhoan=?', [ID_ChiNhanh, idTK], function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function chinhSuaDanhGia(Diem,NoiDung,ID_DanhGia){
    if (NoiDung && ID_DanhGia) {
        var defer = q.defer();
        conn.query('UPDATE danhgia SET Diem=?, NoiDung=? WHERE ID_DanhGia=?', [Diem,NoiDung,ID_DanhGia], function (error, results, fields) {
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
    getIDYeuCau: getIDYeuCau,
    getChiTietYeuCauCuuHo: getChiTietYeuCauCuuHo,
    setTrangThaiYeuCau: setTrangThaiYeuCau,
    chiPhiYeuCauCuuHo: chiPhiYeuCauCuuHo,
    addDanhGia: addDanhGia,
    getChiTietDanhGia: getChiTietDanhGia,
    chinhSuaDanhGia: chinhSuaDanhGia
}