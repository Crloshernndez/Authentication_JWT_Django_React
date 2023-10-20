import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authAPIServices";

const initialState = {
  isAuthenticated: false,
  user: null,
  registered: false,
  isError: false,
  loading: false,
  isSuccess: false,
  message: "",
};

export const register = createAsyncThunk(
  "users/register",
  async ({ name, email, password }, thunkAPI) => {
    const userData = JSON.stringify({
      email,
      name,
      password,
    });
    try {
      return await authService.register(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk("users/me", async (_, thunkAPI) => {
  try {
    return await authService.getUser();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const checkAuthentication = createAsyncThunk(
  "users/verify",
  async (_, thunkAPI) => {
    try {
      return await authService.checkAuthentication();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    const userData = JSON.stringify({
      email,
      password,
    });

    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("users/logout", (_, thunkAPI) => {
  try {
    authService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
        state.registered = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })
      .addCase(checkAuthentication.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isSuccess = true;
      })
      .addCase(checkAuthentication.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;
