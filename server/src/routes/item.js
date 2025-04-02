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

module.exports = router;
