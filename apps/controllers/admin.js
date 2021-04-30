var express = require("express");
var router = express.Router();
var ac_helpers = require("../helpers/account");
var DoiTacModel = require("../models/doitac");

var web_title = "Partner - Cứu Hộ Giao Thông, Cứu Hộ Xe Cơ Giới Tại Khu Vực Đà Nẵng",
    app_name = "XXX Partner",
    logo = "/static/img/logo.png",
    favicon = "/static/img/favicon.ico",
    decription = "Đây là trang web dành cho Partner",
    date = new Date(),
    base_url = "CuuHoXe.TK";
var menu = [{
    name: "Home",
    path: "/"
},
{
    name: "Chi nhánh",
    path: "/chi-nhanh"
},
{
    name: "Dịch vụ",
    path: "/dich-vu"
},
{
    name: "Ưu đãi",
    path: "/uu-dai"
},
{
    name: "Tài khoản",
    path: "/"
}
];


router.route("/")
    .get(function (req, res) {
        res.render("admin", {
            data: {
                page: "thongtintaikhoan",
                web_title: web_title,
                page_name: "Thông tin tài khoản",
                app_name: app_name,
                logo: logo,
                favicon: favicon,
                decription: decription,
                year: date.getFullYear(),
                base_url: base_url,
                username: ac_helpers.getSessionUser(req).username,
                hoten: ac_helpers.getSessionUser(req).hoten,
                avatar: ac_helpers.getSessionUser(req).avatar,
                menu: menu,
                breadcrumb: [{
                    name: "Home",
                    path: "/"
                },
                {
                    name: "Thông tin tài khoản",
                    path: "/"
                }
                ]
            }
        });
    });

router.route("/chitietdichvu/:id")
    .get(function (req, res) {
        try {
            var result = DoiTacModel.getChiTietDichVu(req.params.id);
            if (!result)
                res.json({ "Messenger": "Đã có lỗi xảy ra" });
            else
                result.then(function (dt) {
                    res.render("chitietdichvu", {
                        data: dt[0].MoTa.replace(/(\r\n|\n|\r)/gm, "").trim()
                    });
                }).catch(function (err) {
                    res.json({ "Messenger": err });
                })
        }
        catch (e) {
            res.json({ "Messenger": e });
        }
    });
module.exports = router;