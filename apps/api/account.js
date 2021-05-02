var express = require("express");
var DB = require("../common/DB");
var conn = DB.getConnection();
var router = express.Router();
var UserModel = require("../models/user");
var UserHelper = require("../helpers/account");
const multer = require('multer');

const Storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, appRoot+'/public/img');
    },
    filename(req, file, callback) {
        callback(null, '${file.fieldname}_${Date.now()}_${file.originalname}');
    },
});
const upload = multer({ storage: Storage });
router.route("/dang-ky")
    .post(function (req, res) {
        var user = req.body;
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
                HoVaTen: user.username,
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
                    res.json({ "Messenger": "Đăng ký thành công" });
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
                throw 'Mật khẩu không đúng';
            var result = UserModel.xuLiLogin(user.username, user.password);

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
router.get('/upload-avatar', upload.array('photo', 3), (req, res) => {
    console.log('file', req.files);
    console.log('body', req.body);
    res.status(200).json({
        message: 'success!',
    });
});
module.exports = router;