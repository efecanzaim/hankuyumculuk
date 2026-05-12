-- Footer link URL'lerini diller için ayrı tutabilmek (örn /hakkimizda → /en/about → /ru/about)
ALTER TABLE footer_links
    ADD COLUMN IF NOT EXISTS url_en VARCHAR(255) DEFAULT NULL AFTER url,
    ADD COLUMN IF NOT EXISTS url_ru VARCHAR(255) DEFAULT NULL AFTER url_en;
