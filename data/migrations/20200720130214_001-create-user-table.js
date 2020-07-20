
exports.up = function(knex) {
    return knex.schema
        .createTable("user", table => {
            table.increments("id");
            table.string('name', 50)
                .notNullable()
                .unique();
            table.string('password', 128)
                .notNullable();
            table.text('about');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('user');
};
