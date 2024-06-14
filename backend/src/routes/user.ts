import { Router, Request, Response } from "express"
import { PrismaClient } from "@prisma/client";
import { signupInput, signinInput} from "@harischandio70/medium-common";
const router = Router();
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

router.post('/signup', async (req: Request, res: Response) => {
    const body = req.body;
    try {
        const {success} = signupInput.safeParse(body);
        console.log(success)
        if (!success) return res.status(403).json({ msg: "Wrong inputs" })
        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name
            }
        });
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_KEY!);
        res.status(201).json({ msg: "User created successfully", token: token, id: newUser.id });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating the user" });
    }

});


router.post('/signin', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const {success} = signinInput.safeParse(req.body)
        if(!success) return res.status(403).json({msg: "Wrong inputs"})
        const user = await prisma.user.findFirst({
            where: {
                username,
                password
            }
        })
        if (!user) {
            return res.status(403).json({ msg: "Unauthorized" })
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY!)
        res.status(200).json({ msg: "Logged Successfully", token: token })
    } catch (error) {
        res.status(500).json({ msg: "Server Error" })
    }
});

export default router;