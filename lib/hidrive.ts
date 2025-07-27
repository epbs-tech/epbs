// lib/hidrive.ts
import { createClient } from 'webdav';

const client = createClient(
  'https://webdav.hidrive.ionos.com/',
  {
    username: process.env.HIDRIVE_USERNAME,
    password: process.env.HIDRIVE_PASSWORD,
  }
);

// Fonction de test
export async function testConnection() {
  try {
    const contents = await client.getDirectoryContents('/');
    console.log('Connexion réussie:', contents);
    return true;
  } catch (error) {
    console.error('Échec de connexion:', error);
    return false;
  }
}

export default client;