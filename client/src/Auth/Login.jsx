import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import {
	CardContent,
	Card,
	Button,
	TextField,
	Typography,
	Box,
} from "@mui/material";

export default function Login() {
	const [createAccount, setCreateAccount] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		rPassword: "",
		firstName: "",
		lastName: "",
	});
	const [passwordError, setPasswordError] = useState(false);

	const navigate = useNavigate();
	const { login } = useAuth();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (name === "password" || name === "rPassword") {
			setPasswordError(
				formData.password !== value && name === "rPassword"
			);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (createAccount) {
			if (passwordError) {
				alert("Passwords do not match");
				return;
			}

			const userData = {
				username: formData.username,
				password: formData.password,
				firstName: formData.firstName,
				lastName: formData.lastName,
			};

			try {
				const response = await fetch("http://localhost:3001/user", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(userData),
				});

				const data = await response.json();
				if (response.ok) {
					console.log("User created:", data);
					setCreateAccount(false);
					navigate("/login");
				} else {
					alert(`Error: ${data.error}`);
				}
			} catch (error) {
				console.error("Failed to create user:", error);
				alert(
					"An unexpected error occurred while creating the account."
				);
			}
		} else {
			try {
				const response = await fetch(
					"http://localhost:3001/user/login",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							username: formData.username,
							password: formData.password,
						}),
					}
				);

				const data = await response.json();
				if (response.ok) {
					console.log("User logged in:", data);
					login(data.user);
					navigate(`/`);
				} else {
					alert(`Error: ${data.error}`);
				}
			} catch (error) {
				console.error("Failed to login:", error);
				alert("An unexpected error occurred while logging in.");
			}
		}
	};

	return (
		<Card sx={{ minWidth: 275, maxWidth: 400, mx: "auto", mt: 5, p: 2 }}>
			<CardContent>
				<Typography variant="h4" gutterBottom textAlign="center">
					{createAccount ? "Create Account" : "Login"}
				</Typography>

				<Box component="form" onSubmit={handleSubmit}>
					<TextField
						fullWidth
						required
						name="username"
						label="Username"
						autoComplete="username"
						variant="filled"
						value={formData.username}
						onChange={handleChange}
						margin="normal"
					/>
					<TextField
						fullWidth
						required
						name="password"
						label="Password"
						type="password"
						autoComplete="current-password"
						variant="filled"
						value={formData.password}
						onChange={handleChange}
						margin="normal"
					/>

					{createAccount && (
						<>
							<TextField
								fullWidth
								required
								name="rPassword"
								label="Re-enter Password"
								type="password"
								autoComplete="current-password"
								variant="filled"
								value={formData.rPassword}
								onChange={handleChange}
								margin="normal"
								error={passwordError}
								helperText={
									passwordError
										? "Passwords do not match"
										: ""
								}
							/>
							<TextField
								fullWidth
								required
								name="firstName"
								label="First Name"
								autoComplete="given-name"
								variant="filled"
								value={formData.firstName}
								onChange={handleChange}
								margin="normal"
							/>
							<TextField
								fullWidth
								required
								name="lastName"
								label="Last Name"
								autoComplete="family-name"
								variant="filled"
								value={formData.lastName}
								onChange={handleChange}
								margin="normal"
							/>
						</>
					)}

					<Button
						fullWidth
						type="submit"
						variant="contained"
						sx={{ mt: 2 }}
						disabled={createAccount && passwordError}
					>
						{createAccount ? "Create Account" : "Login"}
					</Button>

					<Button
						fullWidth
						color="secondary"
						onClick={() => setCreateAccount((prev) => !prev)}
						sx={{ mt: 1 }}
					>
						{createAccount
							? "Already have an account? Login"
							: "Don't have an account? Create one"}
					</Button>
				</Box>
			</CardContent>
		</Card>
	);
}
