'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InterestedSubjectSchema extends Schema {
  up () {
    this.create('interested_subjects', (table) => {
      table.increments()
      table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table
      .string('description', 144)
      
      table.string('interested_name', 25)
      .notNullable()
      .unique()

      table.string('image_url')
      .notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('interested_subjects')
  }
}

module.exports = InterestedSubjectSchema
