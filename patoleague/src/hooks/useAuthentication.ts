import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/slices/store";
import { login, signOut, setUser } from "../redux/slices/userSlice";
import { useEffect } from "react";
import api from "@/config/axios";

export function useAuthentication() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = !!user.token;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedNickname = localStorage.getItem("playerNickname");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(setUser(parsedUser));

      if (!storedNickname && parsedUser.id) {
        fetchNickname(parsedUser.id);
      }
    }
  }, [dispatch]);

  const fetchNickname = async (userId: number) => {
    try {
      const response = await api.get(`/players/nickname/user/${userId}`);
      localStorage.setItem("playerNickname", response.data.nickname);
    } catch (error) {
      console.error("Erro ao buscar nickname:", error);
    }
  };

  const handleLogin = async (id: number, fullName: string, email: string, token: string) => {
    const userData = { id, fullName, email, token };
    dispatch(login(userData));

    localStorage.setItem("user", JSON.stringify(userData));

    await fetchNickname(id);
  };

  const handleLogout = () => {
    dispatch(signOut());
    localStorage.removeItem("playerNickname");
  };

  return {
    user,
    isAuthenticated,
    handleLogin,
    handleLogout,
  };
}
