function User(req,res,next){
    console.log('Custom middleware running properly');
    next();
}

exports.module = User;