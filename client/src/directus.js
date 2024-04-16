// src/directus.js
import { createDirectus } from "@directus/sdk";

const directus = createDirectus("http://localhost:8055"); // Replace with your Directus project URL
export default directus;
