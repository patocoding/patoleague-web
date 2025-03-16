import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number | null;
  fullName: string | null;
  email: string | null;
  token: string | null;
}

const getUserFromLocalStorage = (): UserState => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { id: null, fullName: null, email: null, token: null };
  }
  return { id: null, fullName: null, email: null, token: null };
};

const initialState: UserState = getUserFromLocalStorage();

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id: number; fullName: string; email: string; token: string }>) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.token = action.payload.token;

      // Salvar no localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    signOut: (state) => {
      state.id = null;
      state.fullName = null;
      state.email = null;
      state.token = null;

      localStorage.removeItem("user");
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
  },
});

export const { login, signOut, setUser } = userSlice.actions;
export default userSlice.reducer;