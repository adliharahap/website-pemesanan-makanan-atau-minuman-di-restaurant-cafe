import axios from 'axios';
import { setUser } from '../redux/slices/userDataSlice';

export const verifyToken = async (token, dispatch) => {
    try {
        const response = await axios.get('http://localhost:3001/api/users/verify-token', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.data.valid) {
            
            await dispatch(setUser({
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                role: response.data.role,
            }));
        }

        // Jika token valid, kembalikan true, jika tidak kembalikan false
        return response.data.valid;
    } catch (error) {
        console.error('Error saat verifikasi token:', error);
        return false;
    }
};