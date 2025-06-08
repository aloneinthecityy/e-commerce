import { type SchemaTypeDefinition } from 'sanity'
import product from './product' // 1. Importe o seu schema de produto que acabamos de criar

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product], // 2. Adicione a variável 'product' dentro do array 'types'
}