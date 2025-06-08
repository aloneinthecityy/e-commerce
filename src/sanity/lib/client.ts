import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

// Adicione logs para depuração em produção
console.log("SANITY CLIENT INIT - Project ID:", projectId ? "Loaded" : "MISSING");
console.log("SANITY CLIENT INIT - Dataset:", dataset ? "Loaded" : "MISSING");
console.log("SANITY CLIENT INIT - Token:", token ? "Loaded" : "MISSING");

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: token,
})
