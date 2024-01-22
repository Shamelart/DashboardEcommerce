import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await fetch(`http://localhost:5000/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
});

export const createUser = createAsyncThunk(
  "user/createUser",
  async (user, thunkAPI) => {
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const newUser = await response.json();
      return newUser;
    } else {
      return thunkAPI.rejectWithValue(await response.json());
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { entity: null, loading: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = "idle";
        state.entity = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = "idle";
        state.entity = action.payload;
      })

      .addCase(createUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
