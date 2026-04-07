-- ATMOS INITIAL DATA SEED V2
-- Migrating static prototype data to the Relational Architecture
-- Run this in the Supabase SQL Editor AFTER AtmosSchemaV2.sql

DO $$ 
DECLARE 
    atmos_id UUID := uuid_generate_v4();
    unraw_id UUID := uuid_generate_v4();
    apparel_cat_id UUID := uuid_generate_v4();
    audio_cat_id UUID := uuid_generate_v4();
    visual_cat_id UUID := uuid_generate_v4();
BEGIN
    -- 1. SEED CATEGORIES
    INSERT INTO public.categories (id, name, slug) VALUES 
    (apparel_cat_id, 'APPAREL', 'apparel'),
    (audio_cat_id, 'AUDIO', 'audio'),
    (visual_cat_id, 'VISUAL', 'visual');

    -- 2. SEED ARTISTS
    INSERT INTO public.artists (id, name, slug, bio) VALUES 
    (atmos_id, 'ATMOS COLLECTIVE', 'atmos-collective', 'The core architectural identity. Developing systems to sustain vertical sensory environments.'),
    (unraw_id, 'UNRAW', 'unraw', 'The kinetic subgroup. Focusing on high-momentum R&B fluency and sonic architecture.');

    -- 3. SEED PRODUCTS (Static data from products.js)
    
    -- PRODUCT 01: ARCHITECTURAL HOODIE
    INSERT INTO public.products (artist_id, category_id, name, slug, price, stock_quantity, metadata, published)
    VALUES (
        atmos_id, apparel_cat_id, 
        'ARCHITECTURAL HOODIE_V1', 'architectural-hoodie-v1', 
        125.00, 50, 
        '{
            "mandate": "Thermal regulation & silhouette stability. Heavyweight cotton with a structured, architectural drape.",
            "specs": {
                "material": "100% HEAVY COTTON / 500 GSM",
                "sizing": "BOXY FIT / OVERSIZED",
                "care": "COLD WASH / AIR DRY"
            }
        }'::jsonb,
        TRUE
    );

    -- PRODUCT 02: KINETIC CARGO
    INSERT INTO public.products (artist_id, category_id, name, slug, price, stock_quantity, metadata, published)
    VALUES (
        atmos_id, apparel_cat_id, 
        'KINETIC CARGO_SYSTEM', 'kinetic-cargo-system', 
        185.00, 30, 
        '{
            "mandate": "High-mobility urban utility. Reinforced articulated knees and multi-plane storage architecture.",
            "specs": {
                "material": "NYLON TECH-BLEND / WATER REPELLENT",
                "sizing": "ADJUSTABLE WAIST / TAPERED",
                "care": "DRY CLEAN RECOMMENDED"
            }
        }'::jsonb,
        TRUE
    );

    -- PRODUCT 03: SYSTEM LOGO TEE
    INSERT INTO public.products (artist_id, category_id, name, slug, price, stock_quantity, metadata, published)
    VALUES (
        atmos_id, apparel_cat_id, 
        'SYSTEM_LOGO TEE', 'system-logo-tee', 
        55.00, 100, 
        '{
            "mandate": "Sensory comfort & visual identity. Premium jersey with high-fidelity embroidery.",
            "specs": {
                "material": "SUPIMA COTTON / 250 GSM",
                "sizing": "TRUE TO SIZE",
                "care": "WASH AT 30°C"
            }
        }'::jsonb,
        TRUE
    );

    -- PRODUCT 04: UNRAW VINYL
    INSERT INTO public.products (artist_id, category_id, name, slug, price, is_digital, stock_quantity, metadata, published)
    VALUES (
        unraw_id, audio_cat_id, 
        'UNRAW_SYNCHRONIZER VINYL', 'unraw-synchronizer-vinyl', 
        45.00, FALSE, 25, 
        '{
            "mandate": "Pitch-perfect auditory reproduction. 180g heavy-set vinyl in high-momentum black.",
            "specs": {
                "material": "180G AUDIOPHILE VINYL",
                "sizing": "12 INCH / 33 RPM",
                "care": "HANDLE WITH CARE"
            }
        }'::jsonb,
        TRUE
    );

END $$;
