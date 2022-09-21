const db = require("../models");
const weburl = db.weburl;

exports.getAllWeburl = async (req, res) => {
    weburl.findAll()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Status."
            });
        });
}

exports.updateWeburl = async (req, res) => {
    

        try{
            weburl.update({nameurl:req.body.facebookURL},{where:{name:"facebook"}});
            weburl.update({nameurl:req.body.websiteURL},{where:{name:"website"}});
            weburl.update({nameurl:req.body.lineURL},{where:{name:"line"}});
            weburl.update({nameurl:req.body.gmailURL},{where:{name:"gmail"}});
            res.status(200).send({
                message: "Weburl was updated successfully."
              });
        }catch(e){
            res.status(500).send({
                message: "Error updating weburl " 
            });
        }
}