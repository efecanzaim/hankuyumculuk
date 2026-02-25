-- Migration: Add image position and scale columns to products table
ALTER TABLE products ADD COLUMN image_position VARCHAR(20) DEFAULT '50% 50%' AFTER gallery_images;
ALTER TABLE products ADD COLUMN image_scale DECIMAL(3,2) DEFAULT 1.00 AFTER image_position;
