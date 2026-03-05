export const serviceSchema = {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'details',
      title: 'Details (e.g., This might look like...)',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'iconName',
      title: 'Icon Name (Lucide React icon name, e.g., Search, Camera, Globe, Users)',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'id',
      title: 'Section ID (e.g., service-strategy)',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'color',
      title: 'Tailwind Color Class (e.g., bg-sr-teal, bg-sr-sage)',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    }
  ]
};
