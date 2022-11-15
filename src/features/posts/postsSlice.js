import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

function timeAgo(minutes) {
  return sub(new Date(), { minutes }).toISOString()
}

const basicPost = (id, title, content, minutesAgo) => ({
  id,
  title,
  content,
  date: timeAgo(minutesAgo),
  reactions: {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  },
})

const initialState = [
  basicPost('1', 'First Post', 'Hello', 10),
  basicPost('2', 'Second Post', 'More text', 5),
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
          }
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  }
})


export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer