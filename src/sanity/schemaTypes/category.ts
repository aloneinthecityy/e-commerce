const categorySchema = {
  name: 'category', 
  title: 'Category', 
  type: 'document', 
  fields: [
    {
      name: 'name', 
      title: 'Category Name', 
      type: 'string',
    },
  ],
}

export default categorySchema;