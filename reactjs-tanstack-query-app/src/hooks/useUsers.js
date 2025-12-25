import { api } from '../api/axios';

// ============= Get Users =============

export const getUsers = async () => {
    const res = await api.get('/users')
    return res.data
}

// ============= Create Users =============

export const createUser = async ( user ) => {
    const res = await api.post('/users', user);
    return res.data
}

// ============= Update Users =============

export const updateUser  = async ({ id , ...user }) => {
    const res = await api.put(`/users/${id}`, user);
    return res.data
}

// ============= Delete Users =============

export const deleteUser  = async (id) => {
    await api.delete(`/users/${id}`);
}

