import { useState } from "react";
import { Card, CardContent, Typography, Fab, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";

export default function ItemCard({ item }) {
	const [disc, setDisc] = useState(false);
	const navigate = useNavigate();
	return (
		<Card
			sx={{
				maxWidth: "80%",
				cursor: "pointer",
				margin: "auto",
				marginTop: "40px",
				display: "flex",
				justifyContent: "space-between",
				padding: 2,
			}}
			onClick={() => setDisc((prev) => !prev)}
		>
			<Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
				<CardContent>
					<Typography variant="h5" sx={{ marginBottom: 1 }}>
						{item.itemName}
					</Typography>
					<Typography variant="body2">
						{item.description.length > 100 && !disc
							? `${item.description.substring(0, 99)}...`
							: item.description}
					</Typography>
					<Typography
						gutterBottom
						sx={{
							color: "text.secondary",
							fontSize: 14,
							marginTop: 2,
						}}
					>
						Quantity: {item.quantity}
					</Typography>
				</CardContent>
			</Box>

			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-end",
				}}
			>
				<Fab
					color="secondary"
					aria-label="edit"
					sx={{
						alignSelf: "flex-end", // Pushes Fab to the bottom-right
						marginTop: "auto", // Forces it down
					}}
					onClick={(e) => {
						e.stopPropagation();
						navigate(`/editor/${item.id}`);
					}}
				>
					<EditIcon />
				</Fab>
			</Box>
		</Card>
	);
}
