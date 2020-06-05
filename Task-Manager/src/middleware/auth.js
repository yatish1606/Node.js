const auth = async (re,res,next) => {
    console.log('auth')
    next()
}

module.exports = auth