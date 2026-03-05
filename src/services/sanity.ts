import { createClient } from '@sanity/client';

/**
 * Sanity Client Configuration
 * 
 * To use this, you'll need to:
 * 1. Create a Sanity project at sanity.io
 * 2. Add your PROJECT_ID and DATASET to .env
 * 3. Run `npm install @sanity/client`
 */

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-03-03',
});

export async function getProjects() {
  try {
    if (import.meta.env.VITE_SANITY_PROJECT_ID && import.meta.env.VITE_SANITY_PROJECT_ID !== 'your-project-id') {
      const projects = await sanityClient.fetch(`*[_type == "project"]{ title, description, "image": image.asset->url, id }`);
      if (projects && projects.length > 0) return projects;
    }
  } catch (e) {
    console.error("Sanity fetch failed, using fallback", e);
  }
  return null;
}

export async function getServices() {
  try {
    if (import.meta.env.VITE_SANITY_PROJECT_ID && import.meta.env.VITE_SANITY_PROJECT_ID !== 'your-project-id') {
      const services = await sanityClient.fetch(`*[_type == "service"]{ title, subtitle, description, details, iconName, id, color }`);
      if (services && services.length > 0) return services;
    }
  } catch (e) {
    console.error("Sanity fetch failed, using fallback", e);
  }
  return null;
}
