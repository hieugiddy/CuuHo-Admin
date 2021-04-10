var express = require("express");
var DB = require("../common/DB");
var conn = DB.getConnection();
var router = express.Router();
var UserModel = require("../models/user");
var UserHelper = require("../helpers/account");

router.route("/dang-ky")
    .post(function (req, res) {
        var user = req.body;
        var hoTen = 'No Name';
        var ngSinh = '2000-01-01';
        var gTinh = 1;
        var qTich = 'VN';
        try {
            if (!UserHelper.usernameValidation(user.username))
                throw 'Tên đăng nhập không hợp lệ';
            if (!UserHelper.passwordValidation(user.password))
                throw 'Mật khẩu sai định dạng';
            if (!UserHelper.telephoneValidation(user.telephone))
                throw 'Số điện thoại sai định dạng';

            users = {
                TenDangNhap: user.username,
                MatKhau: user.password,
                HoVaTen: hoTen,
                SoDienThoai: user.telephone,
                NgaySinh: ngSinh,
                GioiTinh: gTinh,
                QuocTich: qTich,
            }
            var result = UserModel.addUser(users);

            if (!result)
                res.json({ "Messenger": "Đã có lỗi xảy ra" });
            else
                result.then(function (data) {
                    res.json({ "Messenger": "Thành công" });
                }).catch(function (err) {
                    if (err.code == "ER_DUP_ENTRY")
                        res.json({ "Messenger": "Tên đăng nhập đã tồn tại" });
                    else
                        res.json({ "Messenger": "Thông tin nhập vào không chính xác" });
                })
        }
        catch (e) {
            res.json({ "Messenger": e });
        }

    });
router.route("/kiem-tra-dang-nhap")
    .post(function (req, res) {
        var user = req.body;

        try {
            if (!UserHelper.usernameValidation(user.username))
                throw 'Tên đăng nhập không hợp lệ';
            if (!UserHelper.passwordValidation(user.password))
                throw 'Mật khẩu sai định dạng';
            var result = UserModel.xuLiLogin(user.username,user.password);
            
            if (!result)
                res.json({ "Messenger": "Đã có lỗi xảy ra" });
            else
                result.then(function (data) {
                    res.json(data);
                }).catch(function (err) {
                    res.json({ "Messenger": err });
                })
        }
        catch (e) {
            res.json({ "Messenger": e });
        }

    });
module.exports = router;