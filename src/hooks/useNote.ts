import { useOutletContext } from "react-router-dom"
import { Note } from "../types"

export const useNote = () => {
    return useOutletContext<Note>()
}