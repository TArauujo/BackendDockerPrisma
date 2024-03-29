import bcrypt from "bcrypt";
import { userValidation } from "../validations/user.validation.js";
import { createUser } from "../repositorys/user.repositorys.js";

export const create = async (req, res) => {
    try {
        await userValidation.validate(req.body)
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashPassword;
        const user = await createUser(req.body);
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e);

    }
};