// src/utils/api.js

// Dynamic Base URL selection handles local development and Vercel deployments automatically
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 1. getAllDoctors
 * Fetches the entire 12-consultant array from the database.
 * Uses Next.js data revalidation cache parameters.
 */
export async function getAllDoctors() {
  try {
    const res = await fetch(`${BASE_URL}/all-doctors`, {
      // revalidate: 3600 checks for database modifications every hour automatically
      next: { revalidate: 3600 } 
    });

    if (!res.ok) {
      throw new Error(`HTTP fetch exception recorded with status: ${res.status}`);
    }

    const payload = await res.json();
    return payload.data || [];
  } catch (error) {
    console.error("Critical error inside getAllDoctors utility context:", error.message);
    // Return a safe fallback array so the map loops don't crash your deployed layout page
    return []; 
  }
}

/**
 * 2. getDoctorById
 * Fetches an individual consultant profile matching our custom string identifiers (d1, d2).
 */
export async function getDoctorById(id) {
  try {
    if (!id) return null;

    const res = await fetch(`${BASE_URL}/doctors/${id}`, {
      // cache: 'no-store' ensures fresh availability checks on every profile visit
      cache: 'no-store' 
    });

    if (!res.ok) {
      if (res.status === 404) return null; // Let the page render a clean 404 boundary
      throw new Error(`HTTP fetch exception recorded with status: ${res.status}`);
    }

    const payload = await res.json();
    return payload.data || null;
  } catch (error) {
    console.error(`Critical error inside getDoctorById for ID ${id}:`, error.message);
    return null;
  }
}