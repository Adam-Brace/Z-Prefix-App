import { useEffect, useState } from "react";
import ItemCard from "../Components/ItemCard";
import { useAuth } from "../Auth/AuthContext";
import { Typography } from "@mui/material";

export default function Items() {
	const [items, setItems] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		if (user) {
			fetch(`http://localhost:3001/item/user/${user.id}`)
				.then((res) => {
					if (!res.ok) {
						throw new Error("Failed to fetch items");
					}
					return res.json();
				})
				.then((json) => setItems(json))
				.catch((err) => console.error("Error fetching items:", err));
		}
	}, [user]);

	return (
		<>
			{items.length > 0 ? (
				items.map((item) => <ItemCard key={item.id} item={item} />)
			) : (
				<Typography
					variant="h6"
					color="textSecondary"
					align="center"
					sx={{ marginTop: 4 }}
				>
					No items found.
				</Typography>
			)}
		</>
	);
}
