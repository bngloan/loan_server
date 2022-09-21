module.exports =(app)=>{
    const weburl = require("../controllers/weburl.controller");

    var router = require("express").Router();

    router.get('/getallweburl',weburl.getAllWeburl);
    router.put('/updateweburl',weburl.updateWeburl);

    app.use("/api/weburl",router);
    
}