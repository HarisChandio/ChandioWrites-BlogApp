import { Request, Router, Response } from 'express'
import { auth } from '../middlewares/authMiddleWare';
import { Blog, PrismaClient } from '@prisma/client';
import { createBlogInput, updateBlogInput } from '@harischandio70/medium-common';
const router = Router()

const prisma = new PrismaClient();

router.post('/blog', auth, async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const authorId = req.userId
    try {
        const { success } = createBlogInput.safeParse(req.body)
        if (!success) return res.status(403).json({ msg: "Wrong inputs" })
        const post = await prisma.blog.create({
            data: {
                title,
                authorId: Number(authorId),
                content
            }
        })
        return res.status(200).json({ msg: `Created successfully, ${post.id}` })
    } catch (error) {
        return res.status(500).json({ msg: "Server Error, while creating blog" })
    }
});

router.put('/blog', auth, async (req: Request, res: Response) => {

    const { content, title, blogId } = req.body;
    const authorId = req.userId
    try {

        const { success } = updateBlogInput.safeParse(req.body)
        if (!success) return res.status(403).json({ msg: "Wrong inputs" })

        await prisma.blog.update({
            where: {
                authorId: Number(authorId),
                id: Number(blogId)
            },
            data: {
                title,
                content
            }
        });

        return res.status(200).json({ msg: "Post updated" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error while updating blog", error })
    }
});

router.get('/blog/bulk', async (req: Request, res: Response) => {
    const filter = (req.query.filter)?.toString() || "";
    try {
        const blogs: Blog[] = await prisma.$queryRaw`
        SELECT * FROM "Blog" 
        where "title" ILIKE ${'%' + filter + '%'}
        or "content" ILIKE ${'%' + filter + '%'}
        or EXISTS(
            SELECT 1 FROM 'User'
            WHERE "User"."id" = "Blog"."authodId"
            AND "User"."name" ILIKE {'%' + filter + '%'}
        )
        `
        return res.status(200).json({
            data: blogs.map(blog => ({
                id: blog.id,
                title: blog.title,
                content: blog.content,
                authorId: blog.authorId,
                published: blog.published
            }))
        })
    }

    catch (error) {
        return res.status(500).json({ msg: "Error while getting blogs" })
    }
});

router.get('/blog/:id', async (req: Request, res: Response) => {
    const blogId = req.params.id;
    try {
        const blog = await prisma.blog.findUnique({
            where: {
                id: Number(blogId)
            }
        })
        return res.status(200).json({ data: blog })
    } catch (error) {
        return res.status(500).json({ msg: "Error while finding blog" })
    }
});



export default router;