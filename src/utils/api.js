const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllDoctors = async () => {
  const res = await fetch(`${BASE_URL}/all-doctors`);
  const data = await res.json();
  return data;
};

// export const getDoctorById = async (id, token) => {
//   const res = await fetch(`${BASE_URL}/all-doctors/${id}`, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await res.json();
//   return data;
// };

export const getDoctorById = async (id, token) => {
  try {
    // 🚀 FIXED: Removed the accidental trailing comma string injection here
    const url = `${BASE_URL}/all-doctors/${id}`;

    const fetchOptions = {
      headers: {},
    };

    if (token) {
      fetchOptions.headers["authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(url, fetchOptions);

    // 🛡️ SECURITY BLOCK: If the response is broken (404, 500, etc), stop before parsing HTML!
    if (!res.ok) {
      console.error(`API Error status: ${res.status} for URL: ${url}`);
      return null;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("API did not return JSON data payload.");
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch doctor by ID:", error);
    return null;
  }
};
