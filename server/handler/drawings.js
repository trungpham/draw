var Drawing = require(process.cwd()+'/server/model/drawing');

module.exports = {

    //should create the drawing

    create: function(req, res){
        var drawing = new Drawing(req.body);
        drawing.drawer_id = req.session.userId;
        drawing.save();
        res.send(drawing);
    }



};