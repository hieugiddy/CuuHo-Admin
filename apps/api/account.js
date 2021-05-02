var express = require("express");
var DB = require("../common/DB");
var conn = DB.getConnection();
var router = express.Router();
var UserModel = require("../models/user");
var UserHelper = require("../helpers/account");
const multer = require('multer');
var config = require('config');
var dateFormat = require('dateformat');

const Storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, appRoot + '/public/img');
    },
    filename(req, file, callback) {
        callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
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
router.post('/upload-avatar', upload.array('photo', 3), (req, res) => {
    let file = req.files;
    let id = req.body.id;

    let avatar = config.get('server.link') + '/static/img/' + file[0].filename;
    let result = UserModel.uploadAvatar(id, avatar);

    result.then(function (data) {
        res.status(200).json({
            message: 'Thay đổi ảnh đại diện thành công',
        });
    }).catch(function (err) {
        res.json({ message: err });
    })

});
router.route("/cap-nhat-tai-khoan")
    .post(function (req, res) {
        var user = req.body.user;
        try {
            if (!UserHelper.telephoneValidation(user.SoDienThoai))
                throw 'Số điện thoại sai định dạng';
            var ngSinh = dateFormat(new Date(user.NgaySinh), "yyyy-mm-dd");
            user = {
                ...user,
                NgaySinh: ngSinh
            }

            var result = UserModel.updateUser(user.ID_TaiKhoan, user);

            if (!result)
                res.json({ "Messenger": "Đã có lỗi xảy ra" });
            else
                result.then(function (data) {
                    res.json({ "Messenger": "Thay đổi thông tin tài khoản thành công" });
                }).catch(function (err) {
                    res.json({ "Messenger": "Thông tin nhập vào không chính xác" });
                })
        }
        catch (e) {
            res.json({ "Messenger": e });
        }
    });

router.route("/doi-mat-khau")
    .post(function (req, res) {
        var user = req.body.user;
        try {
            if (!UserHelper.passwordValidation(user.NewPassword))
                throw 'Mật khẩu sai định dạng';

            var isOldPassword = UserModel.xuLiLogin(user.TenDangNhap, user.MatKhau);

            if (!isOldPassword)
                res.json({ "Messenger": "Đã có lỗi xảy ra" });
            else
                isOldPassword.then(function (data) {
                    if (data[0]) {
                        var result = UserModel.changePassword(user.ID_TaiKhoan, user.NewPassword);
                        if (!result)
                            res.json({ "Messenger": "Đã có lỗi xảy ra" });
                        else
                            result.then(function (data) {
                                res.json({ "Messenger": "Thay đổi mật khẩu thành công" });
                            }).catch(function (err) {
                                res.json({ "Messenger": "Thông tin nhập vào không chính xác" });
                            })
                    }
                    else {
                        res.json({ "Messenger": "Mật khẩu cũ không chính xác" });
                    }
                }).catch(function (err) {
                    res.json({ "Messenger": err });
                })

        }
        catch (e) {
            res.json({ "Messenger": e });
        }
    });
module.exports = router;