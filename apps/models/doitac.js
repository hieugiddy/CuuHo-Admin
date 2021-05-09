var q = require("q");
var db = require("../common/DB");
var conn = db.getConnection();


function getDsDoiTac(linhvuc) {
    if (linhvuc) {
        var defer = q.defer();
        if (linhvuc == "all")
            conn.query('SELECT * FROM doitac, loaihinhkinhdoanh WHERE doitac.IDLoaiHinh=loaihinhkinhdoanh.IDLoaiHinh and TrangThai=1', function (error, results, fields) {
                if (error)
                    defer.reject(error);
                else
                    defer.resolve(results);
            });
        else
            conn.query('SELECT * FROM doitac, loaihinhkinhdoanh WHERE doitac.IDLoaiHinh=loaihinhkinhdoanh.IDLoaiHinh and TrangThai=1 AND doitac.ID_DoiTac IN (SELECT ID_DoiTac FROM chitietlinhvuckinhdoanh WHERE ID_LinhVuc=?)', linhvuc, function (error, results, fields) {
                if (error)
                    defer.reject(error);
                else
                    defer.resolve(results);
            });

        return defer.promise;
    }

    return false;
}

function getDsChiNhanh(idDT) {
    if (idDT) {
        var defer = q.defer();
        conn.query('SELECT * FROM chinhanh WHERE ID_DoiTac=?', idDT, function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getDiemDanhGia(idChiNhanh) {
    if (idChiNhanh) {
        var defer = q.defer();
        conn.query('SELECT AVG(Diem) AS Diem FROM danhgia WHERE ID_ChiNhanh=?', idChiNhanh, function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getLinhVucKinhDoanh(idDoiTac) {
    if (idDoiTac) {
        var defer = q.defer();
        conn.query('SELECT lvkd.ID_LinhVuc, TenLinhVuc FROM linhvuckinhdoanh as lvkd, chitietlinhvuckinhdoanh as ctlvkd WHERE lvkd.ID_LinhVuc=ctlvkd.ID_LinhVuc and ID_DoiTac=?', idDoiTac, function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getHinhAnh(idDoiTac, loai, limit) {
    if (idDoiTac) {
        var defer = q.defer();
        conn.query('SELECT * FROM hinhanhdoitac WHERE ID_DoiTac=? AND LoaiAnh=?', [idDoiTac, loai], function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getDichVu(idChiNhanh) {
    if (idChiNhanh) {
        var defer = q.defer();
        conn.query('SELECT * FROM dichvu, chitietdichvu WHERE dichvu.ID_DichVu=chitietdichvu.ID_DichVu AND ID_ChiNhanh=?', [idChiNhanh], function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getChiTietDichVu(idDichVu) {
    if (idDichVu) {
        var defer = q.defer();
        conn.query('SELECT * FROM dichvu WHERE ID_DichVu=?', [idDichVu], function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getUuDai(idDoiTac) {
    if (idDoiTac) {
        var defer = q.defer();
        conn.query('SELECT * FROM uudai WHERE TgKetThuc>=NOW() AND ID_DoiTac=?', [idDoiTac], function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getChiTietUuDai(idUuDai) {
    if (idUuDai) {
        var defer = q.defer();
        conn.query('SELECT * FROM uudai WHERE ID_UuDai=?', [idUuDai], function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getDanhGia(idChiNhanh) {
    if (idChiNhanh) {
        var defer = q.defer();
        conn.query('SELECT * FROM danhgia, taikhoan WHERE danhgia.ID_TaiKhoan=taikhoan.ID_TaiKhoan AND danhgia.ID_ChiNhanh=?', [idChiNhanh], function (error, results, fields) {
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
    var TrangThai = TrangThai.split(',');
    var defer = q.defer();
    conn.query("SELECT * FROM YeuCauCuuHo WHERE TrangThai IN (?) AND ID_ChiNhanh=(SELECT ID_ChiNhanh FROM taikhoan WHERE ID_TaiKhoan=?) ORDER BY ThoiGian DESC", [TrangThai, ID_TaiKhoan], function (error, results) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}

function getChiTietYeuCau(ID_YeuCau) {
    var defer = q.defer();
    conn.query('SELECT * FROM YeuCauCuuHo, taikhoan WHERE YeuCauCuuHo.ID_TaiKhoan=taikhoan.ID_TaiKhoan AND ID_YeuCau=?', [ID_YeuCau], function (error, results, fields) {
        if (error)
            defer.reject(error);
        else
            defer.resolve(results);
    });

    return defer.promise;
}
module.exports = {
    getDsDoiTac: getDsDoiTac,
    getDsChiNhanh: getDsChiNhanh,
    getDiemDanhGia: getDiemDanhGia,
    getLinhVucKinhDoanh: getLinhVucKinhDoanh,
    getHinhAnh: getHinhAnh,
    getDichVu: getDichVu,
    getUuDai: getUuDai,
    getDanhGia: getDanhGia,
    getChiTietDichVu: getChiTietDichVu,
    getChiTietUuDai: getChiTietUuDai,
    dsYeuCauCuuHo: dsYeuCauCuuHo,
    getChiTietYeuCau: getChiTietYeuCau
}