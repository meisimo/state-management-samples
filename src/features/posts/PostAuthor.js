import React from 'react'
import { usersStore } from '../users/stores'

export const PostAuthor = ({ userId }) => {
  const author = usersStore(state =>
    state.users.find(user => user.id === userId))

  return <span>by {author ? author.name : 'Unknown author'}</span>
}