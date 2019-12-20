import { User } from "../models/users";

export const getUsers = (req, res) => {
    User.find({}, (error, users) => {
        if(error) {
            res.status(401).send('Cannot get users');
        }
        else {
            res.status(200).send({ users });
        }
    });
};
