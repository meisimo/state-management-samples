import create from 'zustand'
import { nanoid } from '@reduxjs/toolkit'
import { postsInitialState, createPost } from '../../data'

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const postsStore = create((set, get) => ({
  posts: postsInitialState,
  addPost: async (post) => {
    const newPost = createPost( nanoid(), 'creating...', 'wait a few seconds...', post.user)

    set((state) => ({ posts: [ ...state.posts, newPost ] }))
    await delay(2000)

    const createdPostIndex = get().posts.findIndex((p) => p.id === newPost.id)
    console.log(createdPostIndex, get().posts)
    const createdPost = get().posts[createdPostIndex]

    createdPost.title = post.title
    createdPost.content = post.content

    set((state) => ({ posts: [
      ...state.posts.slice(0, createdPostIndex),
      createdPost,
      ...state.posts.slice(createdPostIndex + 1)
    ]}))
  },
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