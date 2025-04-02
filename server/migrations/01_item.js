/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("item", (table) => {
		table.increments("id").primary();
		table.integer("userId");
		table.foreign("userId").references("user.id");
		table.string("itemName");
		table.text("description");
		table.integer("quantity");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.alterTable("item", (table) => {
			table.dropForeign("userId");
		})
		.then(function () {
			return knex.schema.dropTableIfExists("item");
		});
};
