import ax from "./axios.config";

const register = async (data) => {
  try {
    return await ax.post("auth/registration/", data);
  } catch (error) {
    return error;
  }
};

const login = async (data) => {
  try {
    return await ax.post("/account/auth/token/", data);
  } catch (error) {
    return error;
  }
};

const logout = async (data) => {
  try {
    return await ax.post("auth/logout/");
  } catch (error) {
    return error;
  }
};

// Get Auth User
const getAuthUser = async () => {
  try {
    const res = await ax.get("/account/auth/profile/");

    if (/20[0-6]/g.test(res.status)) {
      return res.data;
    }
  } catch (error) {
    return {};
  }
};

// Api for password reset
const passwordReset = async (data) => {
  try {
    return await ax.post("auth/password/reset/", data);
  } catch (error) {
    return error;
  }
};

// Api for password reset confirm
const passwordResetConfirm = async (data) => {
  try {
    return await ax.post("auth/password/reset/confirm/", data);
  } catch (error) {
    return error;
  }
};

const toExport = {
  register,
  login,
  getAuthUser,
  logout,
  passwordReset,
  passwordResetConfirm,
};

export default toExport;
