import { createContext, useContext, useEffect, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";

const AuthContext = createContext(null);

const USERS_KEY = "drvn_users";
const SESSION_KEY = "drvn_session";

// Seed one admin account so the admin panel is reachable out of the box.
const SEED_USERS = [
  {
    id: "admin-1",
    name: "Admin",
    email: "admin@drvn.app",
    password: "admin123",
    role: "admin",
  },
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readStorage(USERS_KEY, SEED_USERS));
  const [user, setUser] = useState(() => readStorage(SESSION_KEY, null));

  useEffect(() => writeStorage(USERS_KEY, users), [users]);
  useEffect(() => writeStorage(SESSION_KEY, user), [user]);

  function login(email, password) {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: "Incorrect email or password." };
    const { password: _pw, ...safe } = found;
    setUser(safe);
    return { ok: true };
  }

  function register(name, email, password) {
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, error: "An account with this email already exists." };
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role: "user",
    };
    setUsers((prev) => [...prev, newUser]);
    const { password: _pw, ...safe } = newUser;
    setUser(safe);
    return { ok: true };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
