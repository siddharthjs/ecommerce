exports.getError = (req, res, next)=>{
	res.status(404).send("There's an error!")
}