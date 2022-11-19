import { sub } from 'date-fns'

function timeAgo(minutes) {
  return sub(new Date(), { minutes }).toISOString()
}

export const createPost = (id, title, content, user, minutesAgo = 0) => ({
  id,
  title,
  content,
  user,
  date: timeAgo(minutesAgo),
  reactions: {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  },
})

export const postsInitialState = [
  createPost('1', 'First Post', 'Hello', '1', 10),
  createPost('2', 'Second Post', 'More text', '2', 5),
]

export const usersInitialState = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
]