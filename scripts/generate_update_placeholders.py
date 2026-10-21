#!/usr/bin/env python3
"""Generate PLACEHOLDER assets for the October design update.
Writes to public/assets (and sub-folders). Replace with real art later."""
import math, os, sys
from PIL import Image, ImageDraw, ImageFont

OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "..", "public", "assets")
os.makedirs(os.path.join(OUT, "screens"), exist_ok=True)

WHITE = (255, 255, 255, 255)
GREEN = (79, 217, 0)
FONTP = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONTR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"


def font(sz, bold=True):
    p = FONTP if bold else FONTR
    return ImageFont.truetype(p, sz) if os.path.exists(p) else ImageFont.load_default()


def vgrad(w, h, top, bottom):
    img = Image.new("RGB", (w, h), top)
    ov = Image.new("RGB", (w, h), bottom)
    mask = Image.new("L", (w, h))
    md = ImageDraw.Draw(mask)
    for y in range(h):
        md.line([(0, y), (w, y)], fill=int(255 * y / h))
    img.paste(ov, (0, 0), mask)
    return img.convert("RGBA")


def glow(img, accent, cx, cy, strength=0.5, rmax=None):
    w, h = img.size
    g = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(g)
    rmax = rmax or max(w, h) * 0.7
    steps = 44
    for i in range(steps, 0, -1):
        r = rmax * i / steps
        a = int(strength * 115 * (1 - i / steps))
        gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(accent[0], accent[1], accent[2], a))
    return Image.alpha_composite(img, g)


def creature(d, cx, cy, r, accent, eyes=True):
    d.ellipse([cx - r, cy - r * 1.12, cx + r, cy + r * 1.2], fill=(accent[0], accent[1], accent[2], 240))
    d.ellipse([cx - r * 0.72, cy + r * 0.95, cx - r * 0.12, cy + r * 1.5], fill=(accent[0], accent[1], accent[2], 240))
    d.ellipse([cx + r * 0.12, cy + r * 0.95, cx + r * 0.72, cy + r * 1.5], fill=(accent[0], accent[1], accent[2], 240))
    if eyes:
        er = r * 0.19
        for ox in (-0.34, 0.34):
            ex, ey = cx + r * ox, cy - r * 0.08
            d.ellipse([ex - er, ey - er, ex + er, ey + er], fill=WHITE)
            d.ellipse([ex - er * 0.5, ey - er * 0.5, ex + er * 0.5, ey + er * 0.5], fill=(10, 40, 10, 255))


def cutout(name, label, accent, w=800, h=800, egg=False):
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx, cy = w / 2, h / 2
    if egg:
        rw, rh = w * 0.3, h * 0.4
        d.ellipse([cx - rw, cy - rh, cx + rw, cy + rh], fill=(accent[0], accent[1], accent[2], 235))
        er = w * 0.055
        for ox in (-0.13, 0.13):
            ex, ey = cx + w * ox, cy - h * 0.02
            d.ellipse([ex - er, ey - er, ex + er, ey + er], fill=(235, 245, 230, 255))
    else:
        creature(d, cx, cy * 0.98, min(w, h) * 0.3, accent)
    d.text((w / 2, h - 44), label, font=font(34), fill=(174, 202, 166, 255), anchor="mm")
    img.save(os.path.join(OUT, name))


def phone(name, title, subtitle, accent=GREEN, ext="png"):
    w, h = 600, 1304
    img = vgrad(w, h, (12, 45, 24), (4, 18, 11))
    img = glow(img, accent, w / 2, h * 0.4, 0.5, rmax=w * 1.1)
    d = ImageDraw.Draw(img)
    # notch
    d.rounded_rectangle([w / 2 - 70, 0, w / 2 + 70, 34], radius=16, fill=(4, 20, 10, 255))
    # status bar
    d.text((26, 44), "9:41", font=font(26), fill=(234, 251, 230, 255), anchor="lm")
    for i, ox in enumerate((-56, -34, -12)):
        d.ellipse([w - 30 + ox, 38, w - 18 + ox, 50], fill=(174, 202, 166, 255))
    # central creature + ring
    cx, cy = w / 2, h * 0.4
    d.ellipse([cx - 150, cy - 150, cx + 150, cy + 150], outline=(accent[0], accent[1], accent[2], 150), width=3)
    creature(d, cx, cy, 110, accent)
    # bottom card
    cardy = h - 300
    d.rounded_rectangle([34, cardy, w - 34, h - 60], radius=28, fill=(6, 24, 14, 235), outline=(accent[0], accent[1], accent[2], 90), width=1)
    d.text((60, cardy + 46), "NIRMIE", font=font(20), fill=(accent[0], accent[1], accent[2], 255), anchor="lm")
    d.text((60, cardy + 108), title, font=font(40), fill=(234, 251, 230, 255), anchor="lm")
    # subtitle wrap
    sub = subtitle
    if len(sub) > 30:
        words, line, lines = sub.split(), "", []
        for wd in words:
            if len(line + " " + wd) > 30:
                lines.append(line); line = wd
            else:
                line = (line + " " + wd).strip()
        lines.append(line)
    else:
        lines = [sub]
    for i, ln in enumerate(lines[:2]):
        d.text((60, cardy + 160 + i * 34), ln, font=font(24, False), fill=(174, 202, 166, 255), anchor="lm")
    out = img.convert("RGB") if ext == "jpg" else img
    out.save(os.path.join(OUT, "screens", name), quality=88)


def hero_group():
    w, h = 1500, 900
    img = vgrad(w, h, (10, 38, 20), (3, 14, 9))
    for ax, ratio in [((79, 217, 0), .5), ((74, 168, 255), .3), ((255, 106, 61), .25)]:
        img = glow(img, ax, w * ratio, h * 0.55, 0.4, rmax=w * 0.5)
    d = ImageDraw.Draw(img)
    tints = [(79, 217, 0), (74, 168, 255), (255, 106, 61), (155, 107, 255), (255, 210, 74)]
    n = len(tints)
    for i, t in enumerate(tints):
        cx = w * (0.16 + 0.68 * i / (n - 1))
        cy = h * (0.55 + (0.06 if i % 2 else -0.04))
        creature(d, cx, cy, 110 if i == 2 else 90, t)
    d.text((w / 2, h - 50), "hero-group", font=font(34), fill=(174, 202, 166, 255), anchor="mm")
    img.convert("RGB").save(os.path.join(OUT, "hero-group.webp"), "WEBP", quality=85)


def main():
    cocons = {
        "c-coralin.png": ("Coralin", (74, 168, 255)),
        "c-flamik.png": ("Flamik", (255, 106, 61)),
        "c-nebulys.png": ("Nebulys", (155, 107, 255)),
        "c-roquemoss.png": ("Roquemoss", (120, 170, 70)),
        "c-voltelis.png": ("Voltelis", (255, 210, 74)),
    }
    for fn, (lab, ac) in cocons.items():
        cutout(fn, lab, ac, egg=True)

    cutout("n-cocon-solfyr.png", "Solfyr · cocon", (255, 200, 90), w=900, h=1100, egg=True)

    named = {
        "n-flameli.png": ("Flameli", (255, 140, 60)),
        "n-floriny.png": ("Floriny", (123, 238, 60)),
        "n-pyrelion.png": ("Pyrelion", (255, 106, 61)),
        "n-sylkor.png": ("Sylkor", (79, 217, 0)),
    }
    for fn, (lab, ac) in named.items():
        cutout(fn, lab, ac)

    hero_group()

    screens = [
        ("app-accueil.jpg", "Accueil", "Ta carte d'aventure", GREEN, "jpg"),
        ("app-carte.jpg", "Carte", "Explore autour de toi", GREEN, "jpg"),
        ("app-parcours.jpg", "Parcours", "Choisis ta quête", GREEN, "jpg"),
        ("ss-01-flameli.png", "Flameli", "Fais-le monter de niveau", (255, 140, 60), "png"),
        ("ss-02-hauts-lieux.png", "Hauts-Lieux", "Conquiers ta ville", GREEN, "png"),
        ("ss-03-carte.png", "Explore les lieux", "Carte géolocalisée", GREEN, "png"),
        ("ss-04-compagnon.png", "Ton compagnon", "Choisis ton cocon", GREEN, "png"),
        ("ss-05-parcours.png", "Lance un parcours", "Ville, thème, événement", GREEN, "png"),
        ("ss-06-parcours-en-cours.png", "Collecte l'Ætheris", "Parcours en cours", GREEN, "png"),
        ("ss-07-collection.png", "Ta collection", "Des dizaines de Nirmies", GREEN, "png"),
        ("ss-08-saison-des-braises.png", "Saison des Braises", "Les Pyronis à l'honneur", (255, 106, 61), "png"),
        ("ss-09-rarete.png", "Trouve les Nirmies", "Communs aux légendaires", GREEN, "png"),
    ]
    for fn, t, s, ac, ext in screens:
        phone(fn, t, s, ac, ext)

    print("placeholders written to", os.path.abspath(OUT))


if __name__ == "__main__":
    main()
