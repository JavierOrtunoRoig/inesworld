const sortPosts = (posts) => posts.sort((a, b) => {
    return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime();
});

const getFinishedPosts = (posts) => posts.filter((post) => !post.data.draft);

export const getValidPosts = (posts) => sortPosts(getFinishedPosts(posts));