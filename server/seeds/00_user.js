const argon2 = require("argon2");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("user").del();
	await knex("user").insert([
		{
			firstName: "John",
			lastName: "Doe",
			username: "JohnDoe2093",
			password: await argon2.hash("Password123!"),
		},
		{
			firstName: "Jane",
			lastName: "Doe",
			username: "JaneDoe2093",
			password: await argon2.hash("Secret123!"),
		},
	]);
};
