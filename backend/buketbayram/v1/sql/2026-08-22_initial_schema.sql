SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS admin_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  status TINYINT UNSIGNED NOT NULL DEFAULT 1,
  last_login_at DATETIME(6) NULL,
  created_at DATETIME(6) NOT NULL DEFAULT NOW(6),
  updated_at DATETIME(6) NOT NULL DEFAULT NOW(6) ON UPDATE NOW(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS media (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  mime_type VARCHAR(120) NOT NULL,
  file_size INT UNSIGNED NOT NULL,
  width INT UNSIGNED NULL,
  height INT UNSIGNED NULL,
  alt_text_tr VARCHAR(255) NULL,
  alt_text_en VARCHAR(255) NULL,
  created_by BIGINT UNSIGNED NULL,
  created_at DATETIME(6) NOT NULL DEFAULT NOW(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_media_file_path (file_path),
  CONSTRAINT fk_media_created_by
    FOREIGN KEY (created_by) REFERENCES admin_users (id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS treatment_categories (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  status TINYINT UNSIGNED NOT NULL DEFAULT 1,
  created_at DATETIME(6) NOT NULL DEFAULT NOW(6),
  updated_at DATETIME(6) NOT NULL DEFAULT NOW(6) ON UPDATE NOW(6),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS treatment_category_translations (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  category_id BIGINT UNSIGNED NOT NULL,
  locale VARCHAR(5) NOT NULL,
  name VARCHAR(160) NOT NULL,
  slug VARCHAR(190) NOT NULL,
  description TEXT NULL,
  seo_title VARCHAR(190) NULL,
  seo_description VARCHAR(320) NULL,
  created_at DATETIME(6) NOT NULL DEFAULT NOW(6),
  updated_at DATETIME(6) NOT NULL DEFAULT NOW(6) ON UPDATE NOW(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_treatment_category_locale (category_id, locale),
  UNIQUE KEY uq_treatment_category_slug (locale, slug),
  CONSTRAINT fk_treatment_category_translations_category
    FOREIGN KEY (category_id) REFERENCES treatment_categories (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS treatments (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  category_id BIGINT UNSIGNED NOT NULL,
  cover_media_id BIGINT UNSIGNED NULL,
  publish_status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  published_at DATETIME(6) NULL,
  created_at DATETIME(6) NOT NULL DEFAULT NOW(6),
  updated_at DATETIME(6) NOT NULL DEFAULT NOW(6) ON UPDATE NOW(6),
  PRIMARY KEY (id),
  KEY idx_treatments_category_status (category_id, publish_status),
  CONSTRAINT fk_treatments_category
    FOREIGN KEY (category_id) REFERENCES treatment_categories (id),
  CONSTRAINT fk_treatments_cover_media
    FOREIGN KEY (cover_media_id) REFERENCES media (id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS treatment_translations (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  treatment_id BIGINT UNSIGNED NOT NULL,
  locale VARCHAR(5) NOT NULL,
  title VARCHAR(190) NOT NULL,
  slug VARCHAR(190) NOT NULL,
  summary TEXT NULL,
  content LONGTEXT NOT NULL,
  seo_title VARCHAR(190) NULL,
  seo_description VARCHAR(320) NULL,
  created_at DATETIME(6) NOT NULL DEFAULT NOW(6),
  updated_at DATETIME(6) NOT NULL DEFAULT NOW(6) ON UPDATE NOW(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_treatment_translation_locale (treatment_id, locale),
  UNIQUE KEY uq_treatment_translation_slug (locale, slug),
  CONSTRAINT fk_treatment_translations_treatment
    FOREIGN KEY (treatment_id) REFERENCES treatments (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS articles (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  cover_media_id BIGINT UNSIGNED NULL,
  publish_status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  published_at DATETIME(6) NULL,
  reviewed_at DATETIME(6) NULL,
  created_at DATETIME(6) NOT NULL DEFAULT NOW(6),
  updated_at DATETIME(6) NOT NULL DEFAULT NOW(6) ON UPDATE NOW(6),
  PRIMARY KEY (id),
  KEY idx_articles_publish_status (publish_status, published_at),
  CONSTRAINT fk_articles_cover_media
    FOREIGN KEY (cover_media_id) REFERENCES media (id)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS article_translations (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  article_id BIGINT UNSIGNED NOT NULL,
  locale VARCHAR(5) NOT NULL,
  title VARCHAR(190) NOT NULL,
  slug VARCHAR(190) NOT NULL,
  summary TEXT NULL,
  content LONGTEXT NOT NULL,
  seo_title VARCHAR(190) NULL,
  seo_description VARCHAR(320) NULL,
  created_at DATETIME(6) NOT NULL DEFAULT NOW(6),
  updated_at DATETIME(6) NOT NULL DEFAULT NOW(6) ON UPDATE NOW(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_article_translation_locale (article_id, locale),
  UNIQUE KEY uq_article_translation_slug (locale, slug),
  CONSTRAINT fk_article_translations_article
    FOREIGN KEY (article_id) REFERENCES articles (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS faq_entries (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  status TINYINT UNSIGNED NOT NULL DEFAULT 1,
  created_at DATETIME(6) NOT NULL DEFAULT NOW(6),
  updated_at DATETIME(6) NOT NULL DEFAULT NOW(6) ON UPDATE NOW(6),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS faq_translations (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  faq_id BIGINT UNSIGNED NOT NULL,
  locale VARCHAR(5) NOT NULL,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  created_at DATETIME(6) NOT NULL DEFAULT NOW(6),
  updated_at DATETIME(6) NOT NULL DEFAULT NOW(6) ON UPDATE NOW(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_faq_translation_locale (faq_id, locale),
  CONSTRAINT fk_faq_translations_faq
    FOREIGN KEY (faq_id) REFERENCES faq_entries (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS profile_sections (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  section_key VARCHAR(80) NOT NULL,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  status TINYINT UNSIGNED NOT NULL DEFAULT 1,
  created_at DATETIME(6) NOT NULL DEFAULT NOW(6),
  updated_at DATETIME(6) NOT NULL DEFAULT NOW(6) ON UPDATE NOW(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_profile_sections_key (section_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS profile_section_translations (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  section_id BIGINT UNSIGNED NOT NULL,
  locale VARCHAR(5) NOT NULL,
  title VARCHAR(190) NOT NULL,
  content LONGTEXT NOT NULL,
  created_at DATETIME(6) NOT NULL DEFAULT NOW(6),
  updated_at DATETIME(6) NOT NULL DEFAULT NOW(6) ON UPDATE NOW(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_profile_section_locale (section_id, locale),
  CONSTRAINT fk_profile_section_translations_section
    FOREIGN KEY (section_id) REFERENCES profile_sections (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS inquiries (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(160) NOT NULL,
  phone VARCHAR(40) NULL,
  email VARCHAR(190) NULL,
  preferred_contact ENUM('whatsapp', 'phone', 'email') NOT NULL DEFAULT 'whatsapp',
  subject VARCHAR(190) NULL,
  message TEXT NULL,
  locale VARCHAR(5) NOT NULL DEFAULT 'tr',
  consent_at DATETIME(6) NOT NULL,
  status ENUM('new', 'contacted', 'closed') NOT NULL DEFAULT 'new',
  internal_note TEXT NULL,
  created_at DATETIME(6) NOT NULL DEFAULT NOW(6),
  updated_at DATETIME(6) NOT NULL DEFAULT NOW(6) ON UPDATE NOW(6),
  PRIMARY KEY (id),
  KEY idx_inquiries_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_settings (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  setting_key VARCHAR(120) NOT NULL,
  setting_value TEXT NOT NULL,
  is_public TINYINT UNSIGNED NOT NULL DEFAULT 1,
  updated_at DATETIME(6) NOT NULL DEFAULT NOW(6) ON UPDATE NOW(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_site_settings_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO site_settings (setting_key, setting_value, is_public)
VALUES
  ('phone', '+902163912000', 1),
  ('whatsapp', '+905306420443', 1),
  ('instagram', 'dr.buket_bayram', 1),
  ('address_tr', 'Aziz Mahmut Hüdai Mahallesi, Halk Caddesi No:50 K:4 D:9 34762 Üsküdar/ İstanbul', 1),
  ('address_en', 'Aziz Mahmut Hüdai Neighborhood, Halk Street No:50 Floor:4 Apartment:9, 34762 Üsküdar, Istanbul', 1)
ON DUPLICATE KEY UPDATE
  setting_value = VALUES(setting_value),
  is_public = VALUES(is_public);
