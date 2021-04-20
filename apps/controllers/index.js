var express=require("express");
var DB=require("../common/DB.js");
var conn=DB.getConnection();

var router=express.Router();

router.use("/", require(__dirname + "/admin"));
router.use("/account", require(__dirname + "/account"));
router.use("/api/account", require("../api/account"));
router.use("/api/doitac", require("../api/doitac"));

module.exports=router;

