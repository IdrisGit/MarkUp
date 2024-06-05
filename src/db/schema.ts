import { toTypedRxJsonSchema, ExtractDocumentTypeFromTypedRxJsonSchema, RxJsonSchema } from 'rxdb';

// * Note Document Schema
const NoteSchemaLiteral = {
  version: 0,
  title: 'note schema',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 36 },
    title: { type: 'string' },
    markdown: { type: 'string' },
    tagIds: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['id', 'title', 'markdown'],
} as const;
const NoteSchemaTyped = toTypedRxJsonSchema(NoteSchemaLiteral);
export type NoteDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof NoteSchemaTyped>;

// * Tag Document Schema
export const TagSchemaLiteral = {
  version: 0,
  title: 'tag schema',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 36 },
    label: { type: 'string' },
  },
  required: ['id', 'label'],
} as const;
const TagSchemaType = toTypedRxJsonSchema(TagSchemaLiteral);
export type TagDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof TagSchemaType>;

// * Export Schemas
export const NoteSchema: RxJsonSchema<NoteDocType> = NoteSchemaLiteral;
export const TagSchema: RxJsonSchema<TagDocType> = TagSchemaLiteral;
