import { logoutUser } from "../redux/slices/userDataSlice";


const Logout = (dispatch) => {
    // Hapus token dari local storage
    localStorage.removeItem('token');
    // Hapus data pengguna di Redux store
    dispatch(logoutUser());
};

export default Logout;
