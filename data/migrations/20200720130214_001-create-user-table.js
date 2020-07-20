
exports.up = function(knex) {
    return knex.schema
        .createTable("user", table => {
            table.increments("Id");
            table.string('name', 50)
                .notNullable();
            table.string('password', 128)
                .notNullable()
            table.text('about');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('user');
};
