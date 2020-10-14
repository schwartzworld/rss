import {DB} from "../util/DB.mjs";

export class Post {
    static getNew = async (page = 1, limit = 20) => {
        const offset = page > 1 ? ` OFFSET ${page * limit}` : ''
        const p = await DB.all(`select * from posts where hidden=0 ORDER BY pubDate DESC LIMIT ${limit}${offset};`)
        const posts = p.map(post => {
            const preview = Post.getImage(post.description, post.link);
            if (preview) post.preview = preview;
            return post;
        })
        return {
            posts,
            previous: `/?page=${Math.max(Number(page) - 1, 1)}`,
            next: `/?page=${Number(page) + 1}`,
        }
    }

    static unhide = async (id) => {
        return DB.run(`UPDATE posts SET hidden=0 WHERE id=${id}`);
    }

    static hide = async (id) => {
        return DB.run(`UPDATE posts SET hidden=1 WHERE id=${id}`);
    }

    static like = async (id) => {
        return DB.run(`UPDATE posts SET hidden=2 WHERE id=${id}`);
    }

    static getImage(string) {
        const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
        const images = [];
        let img;
        while ((img = imgRex.exec(string))) {
            images.push(img[1]);
        }
        return images[0];
    }
}
