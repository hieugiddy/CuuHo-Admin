var q = require("q");
var db = require("../common/DB");
var conn = db.getConnection();

function getDsDoiTac(linhvuc) {
    if (linhvuc) {
        var defer = q.defer();
        if(linhvuc=="all")
            conn.query('SELECT * FROM doitac, loaihinhkinhdoanh WHERE doitac.IDLoaiHinh=loaihinhkinhdoanh.IDLoaiHinh and TrangThai=1', function (error, results, fields) {
                if (error)
                    defer.reject(error);
                else
                    defer.resolve(results);
            });
        else
            conn.query('SELECT * FROM doitac, loaihinhkinhdoanh WHERE doitac.IDLoaiHinh=loaihinhkinhdoanh.IDLoaiHinh and TrangThai=1 AND doitac.ID_DoiTac IN (SELECT ID_DoiTac FROM chitietlinhvuckinhdoanh WHERE ID_LinhVuc=?)',linhvuc, function (error, results, fields) {
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
function getDiemDanhGia(idChiNhanh){
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
function getLinhVucKinhDoanh(idDoiTac){
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
function getHinhAnh(idDoiTac, loai, limit){
    if (idDoiTac) {
        var defer = q.defer();
        conn.query('SELECT * FROM hinhanhdoitac WHERE ID_DoiTac=? AND LoaiAnh=?', [idDoiTac,loai], function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getDichVu(idChiNhanh){
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
function getChiTietDichVu(idDichVu){
    if (idDichVu) {
        var defer = q.defer();
        conn.query('SELECT MoTa FROM dichvu WHERE ID_DichVu=?', [idDichVu], function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getUuDai(idDoiTac){
    if (idDoiTac) {
        var defer = q.defer();
        conn.query('SELECT * FROM uudai WHERE ID_DoiTac=?', [idDoiTac], function (error, results, fields) {
            if (error)
                defer.reject(error);
            else
                defer.resolve(results);
        });

        return defer.promise;
    }

    return false;
}
function getDanhGia(idChiNhanh){
    if (idChiNhanh) {
        var defer = q.defer();
        conn.query('SELECT * FROM danhgia WHERE ID_ChiNhanh=?', [idChiNhanh], function (error, results, fields) {
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
    getDsDoiTac: getDsDoiTac,
    getDsChiNhanh: getDsChiNhanh,
    getDiemDanhGia: getDiemDanhGia,
    getLinhVucKinhDoanh: getLinhVucKinhDoanh,
    getHinhAnh: getHinhAnh,
    getDichVu: getDichVu,
    getUuDai: getUuDai,
    getDanhGia: getDanhGia,
    getChiTietDichVu: getChiTietDichVu
}