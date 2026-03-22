import { PostModel } from '../models/postModel.js';
import { validatePostInput } from '../utils/validatePost.js';

export function getPosts(_req, res) {
  res.json(PostModel.findAll());
}

export function getPostById(req, res) {
  const postId = Number(req.params.id);
  const post = PostModel.findById(postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found.' });
  }

  return res.json(post);
}

export function createPost(req, res) {
  const validation = validatePostInput(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      message: 'Please fix the validation errors and try again.',
      errors: validation.errors
    });
  }

  const newPost = PostModel.create(req.body);
  return res.status(201).json(newPost);
}

export function updatePost(req, res) {
  const postId = Number(req.params.id);
  const existingPost = PostModel.findById(postId);

  if (!existingPost) {
    return res.status(404).json({ message: 'Post not found.' });
  }

  const validation = validatePostInput(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      message: 'Please fix the validation errors and try again.',
      errors: validation.errors
    });
  }

  const updatedPost = PostModel.update(postId, req.body);
  return res.json(updatedPost);
}

export function deletePost(req, res) {
  const postId = Number(req.params.id);
  const deletedPost = PostModel.delete(postId);

  if (!deletedPost) {
    return res.status(404).json({ message: 'Post not found.' });
  }

  return res.json(deletedPost);
}
