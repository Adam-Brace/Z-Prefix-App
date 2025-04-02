const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const knex = require("knex")(require("../../knexfile")["development"]);

router.get("/", (req, res) => {
	knex("user")
		.select("id", "firstName", "lastName", "username")
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/:id", (req, res) => {
	let id = req.params.id;
	if (isNaN(Number(id))) {
		knex("user")
			.select("id", "firstName", "lastName", "username")
			.whereILike("username", `%${id}%`)
			.then((data) => res.status(200).json(data))
			.catch((err) => res.status(500).json({ error: err.message }));
	} else {
		knex("user")
			.select("id", "firstName", "lastName", "username")
			.where("id", id)
			.then((data) => res.status(200).json(data))
			.catch((err) => res.status(500).json({ error: err.message }));
	}
});

router.post("/", async (req, res) => {
	try {
		const { username, password, firstName, lastName } = req.body;
		const hashedPassword = await argon2.hash(password);
		const [newUser] = await knex("user")
			.insert({
				username,
				password: hashedPassword,
				firstName,
				lastName,
			})
			.returning(["id", "username", "firstName", "lastName"]);

		res.status(201).json(newUser);
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ error: "Failed to create user" });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await knex("user").where({ username }).first();

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const isMatch = await argon2.verify(user.password, password);
		if (!isMatch) {
			return res.status(401).json({ error: "Incorrect password" });
		}

		res.json({ message: "Login successful", user });
	} catch (error) {
		console.error("Error logging in:", error);
		res.status(500).json({ error: "Failed to login" });
	}
});

module.exports = router;
