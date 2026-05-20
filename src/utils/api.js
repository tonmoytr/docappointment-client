const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllDoctors = async () => {
  const res = await fetch(`http://localhost:4000/all-doctors`);
  const data = await res.json();
  return data;
};

export const getDoctorById = async (id) => {
  const res = await fetch(`http://localhost:4000/all-doctors/${id}`);
  const data = await res.json();
  return data;
};
