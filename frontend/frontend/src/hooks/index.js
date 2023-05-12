import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { NotiFicationContext } from "../context/NotificationProver";
import { AuthContext } from "../context/AuthProvier";

export let useTheme = () => useContext(ThemeContext);
export let useNotification = () => useContext(NotiFicationContext);
export let useAuth = () => useContext(AuthContext);
