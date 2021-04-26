var express = require("express");
var DB = require("../common/DB");
var conn = DB.getConnection();
var router = express.Router();
var DoiTacModel = require("../models/doitac");

router.route("/")
    .post(async function (req, res) {
        var doitac = req.body;
        try {
            let dsDoiTac = await DoiTacModel.getDsDoiTac(doitac.linhvuc).then((data) => data);
            let dsDoiTacVaChiNhanh = await Promise.all(dsDoiTac.map(async (item) => {
                let dsLinhVucKinhDoanh = await DoiTacModel.getLinhVucKinhDoanh(item.ID_DoiTac)
                let anhDaiDien = await DoiTacModel.getHinhAnh(item.ID_DoiTac,2)
                let dsChiNhanh= await DoiTacModel.getDsChiNhanh(item.ID_DoiTac)
                let dsChiNhanhVaDanhGia = await Promise.all(dsChiNhanh.map(async (item) => {
                    let diem = await DoiTacModel.getDiemDanhGia(item.ID_ChiNhanh)
                    return({
                        ...item,
                        Diem: (diem[0].Diem === null) ? 0:diem[0].Diem
                    })
                }));
                
                return ({
                    ...item,
                    AnhDaiDien: anhDaiDien,
                    LinhVucKinhDoanh: dsLinhVucKinhDoanh,
                    ChiNhanh: dsChiNhanhVaDanhGia
                })
            })).then(data => data);
            
            res.json(dsDoiTacVaChiNhanh);            
        }
        catch (e) {
            res.json({ "Messenger": e });
        }

    });

module.exports = router;

