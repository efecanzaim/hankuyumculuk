-- Migration: Add content column to categories table for storing extra section data as JSON
ALTER TABLE categories ADD COLUMN content LONGTEXT AFTER hero_description;
