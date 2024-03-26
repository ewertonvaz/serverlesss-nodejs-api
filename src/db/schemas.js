const { text, timestamp, pgTable, uuid } = require("drizzle-orm/pg-core");

const LeadTable = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  email: text('email').notNull(),
  description: text('description').default('Some description here.'),
  createdAt: timestamp('created_at').defaultNow()
});

module.exports.LeadTable = LeadTable;