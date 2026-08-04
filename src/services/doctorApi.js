import api from "./api";

// =============================
// Get All Doctors
// =============================
export const getDoctorsApi = async () => {

    const response = await api.get("/doctors");

    return response.data;

};

// =============================
// Get Doctor By ID
// =============================
export const getDoctorApi = async (id) => {

    const response = await api.get(`/doctors/${id}`);

    return response.data;

};

// =============================
// Create Doctor (Admin)
// =============================
export const createDoctorApi = async (doctorData) => {

    const response = await api.post(
        "/doctors",
        doctorData
    );

    return response.data;

};

// =============================
// Update Doctor
// =============================
export const updateDoctorApi = async (
    id,
    doctorData
) => {

    const response = await api.put(
        `/doctors/${id}`,
        doctorData
    );

    return response.data;

};

// =============================
// Delete Doctor (Soft Delete)
// =============================
export const deleteDoctorApi = async (id) => {

    const response = await api.delete(
        `/doctors/${id}`
    );

    return response.data;

};