import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./Auth/AuthContext.jsx";
import App from "./App/App.jsx";

const theme = createTheme({
	colorSchemes: {
		dark: true,
	},
});

createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</AuthProvider>
);
