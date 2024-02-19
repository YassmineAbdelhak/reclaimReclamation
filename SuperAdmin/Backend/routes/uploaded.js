exports.uploadFile = (req, res) => {
  if (typeof req.file !== 'undefined') {
    res.json({
      problemImage:'http://localhost:5000/uploads/'+ req.file.filename
    })
  } else {
    res.status(400).json({
      msg: 'Please upload valid file'
    })
  }
}