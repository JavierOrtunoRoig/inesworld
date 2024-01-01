import type { MarkdownInstance } from "astro";

type Post = MarkdownInstance<Record<string, any>>;

const sortPosts = (posts:  Post[]) => posts.sort((a, b) => {
    return new Date(b.frontmatter.pubDate).getTime() - new Date(a.frontmatter.pubDate).getTime();
});

const getFinishedPosts = (posts:  Post[]) => posts.filter((post) => !post.frontmatter.draft);

export const getValidPosts = (posts:  Post[]) => sortPosts(getFinishedPosts(posts));