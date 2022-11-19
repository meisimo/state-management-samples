import create from 'zustand'
import { usersInitialState } from '../../data'

export const usersStore = create((set) => ({
  users: usersInitialState,
}))