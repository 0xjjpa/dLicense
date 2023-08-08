import { create } from 'zustand'
import { WASMState } from './WASMTypes'

export const useWASMStore = create<WASMState>()(() => (
  {
    file: null,
    arweaveUrl: ''
  }
))