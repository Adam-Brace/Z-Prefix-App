import { useEffect, useState } from "react";
import ItemCard from "../Components/ItemCard";

export default function Home() {
	const [items, setItems] = useState();
	useEffect(() => {
		fetch("http://localhost:3001/item")
			.then((res) => res.json())
			.then((json) => setItems(json))
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			{items?.map((item) => (
				<ItemCard key={item.id} item={item} />
			))}
		</>
	);
}
