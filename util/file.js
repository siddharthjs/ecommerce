const multer = require('multer')

const storage = multer.diskStorage({
	destination: function(req, file, callback){
		callback(null, 'images')
	},
	filename: function(req, file, callback){
		callback(null,file.originalname)
	}
})

const fileFilter = function(req, file, callback){
	if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
		callback(null, true)
	}
	else{
		callback(null,false)
	}
}

const upload = multer({storage: storage, fileFilter: fileFilter})

module.exports = upload