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
            const users = await User.find({});
            const userList = [];
            users.forEach(item => {
                if(item.company === req.params.id){
                    userList.push(item.name)}
                })
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

    //get groups
    getGroups: async (req, res) => {
        try {
            const groups = await Group.find({});
            const groupList = [];
            groups.forEach(item => {
                if(item.company === req.params.id){
                    groupList.push(item.name)
                }
            })
            res.status(200).json(groupList);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg:'server error'});
        }
    },

    //add group
    addGroup: async (req, res) => {
        const {name, company, owner} = req.body

        try {
            let groupList = await Group.find({company});
            console.log(groupList);
            groupList.forEach(item => {
                if(item.name === name){
                    return res.status(400).json({msg:'Group already exists'});
                };
            })
            newGroup = new Group({
                name,
                company,
                owner
            });
            await newGroup.save();
            return res.json(newGroup);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg:'server error'})
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