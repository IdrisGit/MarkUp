export type Tag =  {
    id: string,
    label: string
}

export interface NoteData{
    title: string,
    markdown: string,
    tags: Tag[]
}

export interface Note extends NoteData{
    id: string
}

export interface RawNoteData{
    title: string,
    markdown: string,
    tagIds: string[]
}

export interface RawNote extends RawNoteData{
    id: string
}