const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile")["development"]);

router.get("/", (req, res) => {
	knex("item")
		.select()
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/:id", (req, res) => {
	let id = req.params.id;
	if (isNaN(Number(id))) {
		knex("item")
			.select()
			.whereILike("itemName", `%${id}%`)
			.then((data) => res.status(200).json(data))
			.catch((err) => res.status(500).json({ error: err.message }));
	} else {
		knex("item")
			.select()
			.where("id", id)
			.then((data) => res.status(200).json(data))
			.catch((err) => res.status(500).json({ error: err.message }));
	}
});

router.get("/user/:userId", (req, res) => {
	const { userId } = req.params;

	if (isNaN(Number(userId))) {
		return res.status(400).json({ error: "Invalid user ID" });
	}

	knex("item")
		.select()
		.where("userId", userId)
		.then((data) => {
			if (data.length === 0) {
				return res
					.status(404)
					.json({ error: "No items found for this user" });
			}
			res.status(200).json(data);
		})
		.catch((err) => res.status(500).json({ error: err.message }));
});

router.post("/", async (req, res) => {
	try {
		const { userId, itemName, description, quantity } = req.body;
		const [newItem] = await knex("item")
			.insert({ userId, itemName, description, quantity })
			.returning("*");
		res.status(201).json(newItem);
	} catch (error) {
		console.error("Error creating item:", error);
		res.status(500).json({ error: "Failed to create item" });
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { itemName, description, quantity } = req.body;
		const [updatedItem] = await knex("item")
			.where("id", id)
			.update({ itemName, description, quantity })
			.returning("*");
		if (!updatedItem) {
			return res.status(404).json({ error: "Item not found" });
		}
		res.status(200).json(updatedItem);
	} catch (error) {
		console.error("Error updating item:", error);
		res.status(500).json({ error: "Failed to update item" });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		// Check if the item exists
		const item = await knex("item").where("id", id).first();
		if (!item) {
			return res.status(404).json({ error: "Item not found" });
		}

		// Delete the item
		await knex("item").where("id", id).del();
		res.status(200).json({ message: "Item deleted successfully" });
	} catch (error) {
		console.error("Error deleting item:", error);
		res.status(500).json({ error: "Failed to delete item" });
	}
});

module.exports = router;
