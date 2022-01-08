const User = require('../models/User')

exports.getUsers = async (req, res, next) => {
    try {
        const { userId } = res.locals
        const userList = await User.find({ '_id': { '$ne': userId } })

        res.status('200').render('user_list', { data: userList })

    } catch (err) {
        next(err)
    }
}

exports.createAdmin = async (req, res, next) => {
    try {
        const { name, email, password, passwordConfirm } = req.body
        const accountType = 'admin'

        await User.create({ name, email, password, passwordConfirm, accountType })

        res.status('201').json({
            status: 'ok'
        })
    } catch (err) {
        next(err)
    }
}