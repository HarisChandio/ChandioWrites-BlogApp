"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleWare_1 = require("../middlewares/authMiddleWare");
const client_1 = require("@prisma/client");
const medium_common_1 = require("@harischandio70/medium-common");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post('/blog', authMiddleWare_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const authorId = req.userId;
    try {
        const { success } = medium_common_1.createBlogInput.safeParse(req.body);
        if (!success)
            return res.status(403).json({ msg: "Wrong inputs" });
        const post = yield prisma.blog.create({
            data: {
                title,
                authorId: Number(authorId),
                content
            }
        });
        return res.status(200).json({ msg: `Created successfully, ${post.id}` });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error, while creating blog" });
    }
}));
router.put('/blog', authMiddleWare_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, title, blogId } = req.body;
    const authorId = req.userId;
    try {
        const { success } = medium_common_1.updateBlogInput.safeParse(req.body);
        if (!success)
            return res.status(403).json({ msg: "Wrong inputs" });
        yield prisma.blog.update({
            where: {
                authorId: Number(authorId),
                id: Number(blogId)
            },
            data: {
                title,
                content
            }
        });
        return res.status(200).json({ msg: "Post updated" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error while updating blog", error });
    }
}));
router.get('/blog/bulk', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const filter = ((_a = (req.query.filter)) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    try {
        const blogs = yield prisma.$queryRaw `
        SELECT * FROM "Blog" 
        where "title" ILIKE ${'%' + filter + '%'}
        or "content" ILIKE ${'%' + filter + '%'}
        or EXISTS(
            SELECT 1 FROM 'User'
            WHERE "User"."id" = "Blog"."authodId"
            AND "User"."name" ILIKE {'%' + filter + '%'}
        )
        `;
        return res.status(200).json({
            data: blogs.map(blog => ({
                id: blog.id,
                title: blog.title,
                content: blog.content,
                authorId: blog.authorId,
                published: blog.published
            }))
        });
    }
    catch (error) {
        return res.status(500).json({ msg: "Error while getting blogs" });
    }
}));
router.get('/blog/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    try {
        const blog = yield prisma.blog.findUnique({
            where: {
                id: Number(blogId)
            }
        });
        return res.status(200).json({ data: blog });
    }
    catch (error) {
        return res.status(500).json({ msg: "Error while finding blog" });
    }
}));
exports.default = router;
