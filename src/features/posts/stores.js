import create from 'zustand'
import { nanoid } from '@reduxjs/toolkit'
import { postsInitialState, createPost } from '../../data'

export const postsStore = create((set) => ({
  posts: postsInitialState,
  addPost: (post) => set((state) => ({
    posts: [
      ...state.posts,
      createPost( nanoid(), post.title, post.content, post.user)
    ]
  })),
  editPost: (post) => set((state) => {
    const postIndex = state.posts.findIndex(p => p.id === post.id)
    const newPost = { ...state.posts[postIndex], ...post }
    return {
      posts: [
        ...state.posts.slice(0, postIndex),
        newPost,
        ...state.posts.slice(postIndex + 1)
      ]
    }
  }),
  addReaction: (postId, reactionName) => set((state) => {
    const postIndex = state.posts.findIndex(p => p.id === postId)
    const newPost = { ...state.posts[postIndex] }

    console.log(newPost.reactions, reactionName)
    console.log(newPost.reactions[reactionName])
    newPost.reactions[reactionName]++

    return {
      posts: [
        ...state.posts.slice(0, postIndex),
        newPost,
        ...state.posts.slice(postIndex + 1)
      ]
    }
  }),
}))