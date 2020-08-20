const User = require('../../../models/User');
const Group = require('../../../models/Group');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
require('dotenv').config();


module.exports = {
    //register user
    register: async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {name, email, password, group, isAdmin} = req.body;

        try {
            let user = await User.findOne({email});
            if(user){
                return res.status(400).json({msg:'User already exists'});
            };
            user = new User({
                name,
                email,
                password,
                group,
                isAdmin
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();
            await Group.findOne({name:group})
            .then(group => {
                group.members = [...group.members, email];
                group.save();
            })

            return res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }
    },

    //logout user, end session
    logout:(req, res) => {
        req.session.destroy();
        console.log('logout ', req.session);
        req.logout();
        return res.json({message:'Logged out'});
    }
}