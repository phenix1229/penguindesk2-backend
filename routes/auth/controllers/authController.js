const User = require('../../../models/User');
const Group = require('../../../models/Group');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {
    
    //get user
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.status(200).json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg:'server error'});
        }
    },
    
    //get users
    getUsers: async (req, res) => {
        try {
            const users = await User.find({}).select('email').select('-_id');
            const userList = [];
            users.forEach(item => userList.push(item.email))
            res.status(200).json(userList);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg:'server error'});
        }
    },
    
    //get group
    getGroup: async (req, res) => {
        try {
            const user = await Group.findById({name:req.params.id});
            res.status(200).json(group);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg:'server error'});
        }
    },
    
    //update group
    updateGroup: async (req, res) => {
        try {
            const {member} = req.body.member
            await Group.findByIdAndUpdate({name:req.params.id})
                .then(group => {
                    group.members = [...group.members, member];
                    group.save();
                })
            res.status(200).json(group);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg:'server error'});
        }
    },
    
    //get groups
    getGroups: async (req, res) => {
        try {
            const groups = await Group.find({}).select('name').select('-_id');
            const groupList = [];
            groups.forEach(item => groupList.push(item.name))
            res.status(200).json(groupList);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg:'server error'});
        }
    },

    //add group
    addGroup: async (req, res) => {
        const {name} = req.body

        try {
            let group = await Group.findOne({name});
            if(group){
                return res.status(400).json({msg:'Group already exists'});
            };
            group = new Group({
                name
            });
            await group.save();
            return res.json(group);
        } catch {
            
        }
    },

    //login route
    login: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({msg:'Invalid credentials'});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({msg:'Invalid credentials'})
            }
            
            const payload = {
                user: {
                    id: user.id,
                }
            }

            jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:360000
            }, (err, token) => {
                if(err) throw err;
                res.json({token})
            } );
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg:'server error'})
        }
    }
};