CREATE TABLE IF NOT EXISTS "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"description" text DEFAULT 'Some description here.',
	"created_at" timestamp DEFAULT now()
);
