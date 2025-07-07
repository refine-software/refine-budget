import { matchPath } from "react-router";

export const ROUTE_TITLES: { path: string; title: string | ((username: string) => string) }[] = [
    { path: "/", title: (username) => `Sup ${username}` },
    { path: "/login", title: "Login" },
    { path: "/register", title: "Register" },
    { path: "/history", title: "History" },
    { path: "/history/:id", title: "Details" },
    { path: "/profile", title: "Profile" },
    { path: "/control", title: "Control" },
    { path: "/users", title: "Users" },
    { path: "/transactions", title: "Transactions" },
    { path: "/manage-emails", title: "Manage Emails" },
    { path: "/reset-password", title: "Password Reset" },
    { path: "/reset-password/confirm", title: "Confirm Reset" },
];

export function getHeaderTitle(pathname: string, username: string): string {
    for (const route of ROUTE_TITLES) {
        if (matchPath(route.path, pathname)) return typeof route.title === "function" ? route.title(username) : route.title;
    }
    return "";
}
