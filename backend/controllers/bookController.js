exports.addBookController = async(req,res) => {
    console.log('Inside book controller');
    res.status(200).json("Request received")
    
}

exports.approveBookController = async (req,res) => {
    console.log('Approve book initialized');
    res.status(200).json("Book Approved")
    
}