-- Trend bölümü EN/RU link kolonları
ALTER TABLE homepage_trend_section
    ADD COLUMN IF NOT EXISTS left_link_en VARCHAR(255) AFTER left_link,
    ADD COLUMN IF NOT EXISTS left_link_ru VARCHAR(255) AFTER left_link_en,
    ADD COLUMN IF NOT EXISTS right_link_en VARCHAR(255) AFTER right_link,
    ADD COLUMN IF NOT EXISTS right_link_ru VARCHAR(255) AFTER right_link_en;
