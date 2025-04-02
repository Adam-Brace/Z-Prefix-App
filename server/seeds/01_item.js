/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("item").del();
	await knex("item").insert([
		{
			userId: 1,
			itemName: "Cup",
			description: "Red Solo cup pack of 24",
			quantity: 738,
		},
		{
			userId: 1,
			itemName: "Plate",
			description: "Dixie plate pack of 90",
			quantity: 259,
		},
		{
			userId: 1,
			itemName: "Table Cloth",
			description: 'White 60" X 102" Washable Polyester',
			quantity: 738,
		},
		{
			userId: 2,
			itemName: "Tesla Model 3",
			description:
				"A sleek, all-electric sedan with a minimalist design, advanced autopilot, and a range of up to 358 miles. It features rapid acceleration, a spacious interior, and a high-tech touchscreen interface for seamless control.",
			quantity: 1852,
		},
		{
			userId: 2,
			itemName: "Ford Mustang GT",
			description:
				"A powerful muscle car with a 5.0L V8 engine, aggressive styling, and thrilling performance. Delivers up to 450 horsepower with a roaring exhaust note, perfect for driving enthusiasts.",
			quantity: 97,
		},
	]);
};
