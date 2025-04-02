import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function ItemCard({ item }) {
	const [disc, setDisc] = useState(false);

	return (
		<Card
			sx={{
				maxWidth: "80%",
				cursor: "pointer",
				margin: "auto",
				marginTop: "40px",
			}}
			onClick={() => setDisc((prev) => !prev)}
		>
			<CardContent>
				<Typography variant="h5" style={{ marginBottom: "10px" }}>
					{item.itemName}
				</Typography>
				<Typography variant="body2">
					{item.description.length > 100 && !disc
						? item.description.substring(0, 99) + "..."
						: item.description}
				</Typography>
				<br />
				<Typography
					gutterBottom
					sx={{ color: "text.secondary", fontSize: 14 }}
				>
					Quantity: {item.quantity}
				</Typography>
			</CardContent>
		</Card>
	);
}
