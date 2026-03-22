import { postStore } from '../data/postStore.js';

let nextPostId = postStore.length + 1;

export const PostModel = {
  findAll() {
    return [...postStore].sort((firstPost, secondPost) => {
      return new Date(secondPost.createdAt).getTime() - new Date(firstPost.createdAt).getTime();
    });
  },

  findById(postId) {
    return postStore.find((post) => post.id === postId) ?? null;
  },

  create(postData) {
    const timestamp = new Date().toISOString();
    const newPost = {
      id: nextPostId++,
      title: postData.title.trim(),
      excerpt: postData.excerpt.trim(),
      content: postData.content.trim(),
      author: postData.author.trim(),
      category: postData.category.trim(),
      published: postData.published,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    postStore.push(newPost);
    return newPost;
  },

  update(postId, postData) {
    const postIndex = postStore.findIndex((post) => post.id === postId);

    if (postIndex === -1) {
      return null;
    }

    const currentPost = postStore[postIndex];
    const updatedPost = {
      ...currentPost,
      title: postData.title.trim(),
      excerpt: postData.excerpt.trim(),
      content: postData.content.trim(),
      author: postData.author.trim(),
      category: postData.category.trim(),
      published: postData.published,
      updatedAt: new Date().toISOString()
    };

    postStore[postIndex] = updatedPost;
    return updatedPost;
  },

  delete(postId) {
    const postIndex = postStore.findIndex((post) => post.id === postId);

    if (postIndex === -1) {
      return null;
    }

    return postStore.splice(postIndex, 1)[0];
  }
};
