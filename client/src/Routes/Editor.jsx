import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

export default function Editor() {
	const { user } = useAuth();
	const { itemId } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		itemName: "",
		description: "",
		quantity: "",
	});
	const [error, setError] = useState({
		itemName: false,
		description: false,
		quantity: false,
	});

	useEffect(() => {
		if (itemId > 0) {
			fetch(`http://localhost:3001/item/${itemId}`)
				.then((res) => res.json())
				.then((json) => {
					const itemData = json[0];
					setFormData({
						itemName: itemData.itemName || "",
						description: itemData.description || "",
						quantity: itemData.quantity || "",
					});
				})
				.catch((err) => console.log(err));
		}
	}, [itemId]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setError((prev) => ({ ...prev, [name]: value.trim() === "" }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (
			Object.values(error).some((err) => err) ||
			Object.values(formData).some(
				(val) => typeof val === "string" && val.trim() === ""
			)
		) {
			return;
		}

		try {
			if (itemId == 0) {
				formData.userId = user.id;
				const response = await fetch("http://localhost:3001/item", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});
				if (!response.ok) {
					throw new Error("Failed to create item");
				}
			} else {
				const response = await fetch(
					`http://localhost:3001/item/${itemId}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(formData),
					}
				);
				if (!response.ok) {
					throw new Error("Failed to update item");
				}
			}
			navigate(`/user/items`);
		} catch (error) {
			console.error(error);
			alert("An error occurred while saving the item.");
		}
	};

	const handleDelete = async () => {
		try {
			const response = await fetch(
				`http://localhost:3001/item/${itemId}`,
				{
					method: "DELETE",
				}
			);
			if (!response.ok) {
				throw new Error("Failed to delete item");
			}
			navigate(`/user/items`);
		} catch (error) {
			console.error(error);
			alert("An error occurred while deleting the item.");
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
				maxWidth: 400,
				margin: "auto",
				padding: 3,
				boxShadow: 3,
				borderRadius: 2,
				backgroundColor: "background.default",
				mt: 5,
			}}
		>
			<Typography variant="h5" textAlign="center" sx={{ color: "white" }}>
				{itemId == 0 ? "Add Item" : "Edit Item"}
			</Typography>

			<TextField
				label="Item Name"
				name="itemName"
				variant="outlined"
				fullWidth
				value={formData.itemName}
				onChange={handleChange}
				required
				error={error.itemName}
				helperText={error.itemName ? "Item Name is required" : ""}
			/>

			<TextField
				label="Description"
				name="description"
				variant="outlined"
				fullWidth
				multiline
				rows={3}
				value={formData.description}
				onChange={handleChange}
				required
				error={error.description}
				helperText={error.description ? "Description is required" : ""}
			/>

			<TextField
				label="Quantity"
				name="quantity"
				type="number"
				variant="outlined"
				fullWidth
				value={formData.quantity}
				onChange={handleChange}
				required
				error={error.quantity}
				helperText={error.quantity ? "Quantity is required" : ""}
			/>

			<Box
				sx={{
					display: "flex",
					gap: 2,
					justifyContent: "space-between",
				}}
			>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={Object.values(formData).some(
						(val) => String(val).trim() === ""
					)}
				>
					{itemId == 0 ? "Save Item" : "Save Changes"}
				</Button>
				{itemId > 0 && (
					<Button
						variant="contained"
						color="error"
						onClick={handleDelete}
					>
						Delete Item
					</Button>
				)}
			</Box>
		</Box>
	);
}
