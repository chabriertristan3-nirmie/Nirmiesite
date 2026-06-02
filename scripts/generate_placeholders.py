#!/usr/bin/env python3
"""
Generate on-brand PLACEHOFLDER assets for the Nirmie site.
These are stand-ins to be replaced by the real artwork (see README).
Outputs to public/assets/.
"""
import math
import os
from PIL import Image, ImageDraw, ImageFont

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "assets")
os.makedirs(OUT, exist_ok=True)

ELECTRIC = (79, 217, 0, 255)
ELECTRIC_SOFT = (123, 238, 60, 255)
FOREST = (0, 41, 0, 255)
WHITE = (255, 255, 255, 255)

CLAN_ACCENT = {
    "scene-o": (255, 210, 74),   # Lumiris
    "scene-q": (59, 224, 192),   # Valmirs / Sylvanis
    "scene-n": (155, 107, 255),  # Noctyrs
    "scene-p": (191, 239, 255),  # Zéphyris
    "scene-m": (74, 168, 255),   # Thalmyrs
    "scene-l": (255, 106, 61),   # Pyronis
    "scene-r": (120, 200, 60),
    "halo-portrait": (230, 255, 217),
}


def font(size):
    for p in [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def stroke_path(draw, pts, width, fill):
    """Stroke a polyline with round caps/joints by stamping circles."""
    r = width / 2
    for i in range(len(pts) - 1):
        (x0, y0), (x1, y1) = pts[i], pts[i + 1]
        dist = math.hypot(x1 - x0, y1 - y0)
        steps = max(1, int(dist / 3))
        for s in range(steps + 1):
            t = s / steps
            x = x0 + (x1 - x0) * t
            y = y0 + (y1 - y0) * t
            draw.ellipse([x - r, y - r, x + r, y + r], fill=fill)


def arch(cx, cy, radius, a0, a1, n=60):
    """Sample an arc (degrees), 0°=east, going counter-clockwise in screen coords."""
    pts = []
    for i in range(n + 1):
        a = math.radians(a0 + (a1 - a0) * i / n)
        pts.append((cx + radius * math.cos(a), cy - radius * math.sin(a)))
    return pts


def emblem_path():
    """The Nirmie 'n-u' interlaced mark, on a 1000×1000 grid."""
    w = 150
    pts = []
    # left leg up
    pts += [(110, 660), (110, 290)]
    # n hump (top half: 180° -> 0°)
    pts += arch(290, 290, 180, 180, 0)
    # down the shared leg
    pts += [(470, 290), (470, 650)]
    # u hump (bottom half: 180° -> 360°)
    pts += arch(650, 650, 180, 180, 360)
    # right leg up
    pts += [(830, 650), (830, 290)]
    return pts, w


def make_emblem(name, color):
    img = Image.new("RGBA", (1000, 1000), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    pts, w = emblem_path()
    stroke_path(d, pts, w, color)
    img = img.resize((512, 512), Image.LANCZOS)
    img.save(os.path.join(OUT, name))


def vgrad(w, h, top, bottom):
    base = Image.new("RGB", (w, h), top)
    top_img = Image.new("RGB", (w, h), bottom)
    mask = Image.new("L", (w, h))
    md = ImageDraw.Draw(mask)
    for y in range(h):
        md.line([(0, y), (w, y)], fill=int(255 * y / h))
    base.paste(top_img, (0, 0), mask)
    return base.convert("RGBA")


def radial_glow(img, accent, cx_ratio=0.5, cy_ratio=0.42, strength=0.5):
    w, h = img.size
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    cx, cy = w * cx_ratio, h * cy_ratio
    maxr = max(w, h) * 0.7
    steps = 48
    for i in range(steps, 0, -1):
        r = maxr * i / steps
        a = int(strength * 120 * (1 - i / steps))
        gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(accent[0], accent[1], accent[2], a))
    return Image.alpha_composite(img, glow)


def make_scene(name, label, w=1200, h=900):
    accent = CLAN_ACCENT.get(name, (79, 217, 0))
    img = vgrad(w, h, (8, 30, 16), (3, 16, 10))
    img = radial_glow(img, accent, strength=0.55)
    d = ImageDraw.Draw(img)
    # creature blob
    bx, by, br = w * 0.5, h * 0.46, min(w, h) * 0.22
    d.ellipse([bx - br, by - br * 1.15, bx + br, by + br * 1.15],
              fill=(accent[0], accent[1], accent[2], 235))
    # eyes
    er = br * 0.18
    for ox in (-0.34, 0.34):
        ex = bx + br * ox
        ey = by - br * 0.1
        d.ellipse([ex - er, ey - er, ex + er, ey + er], fill=WHITE)
        d.ellipse([ex - er * 0.5, ey - er * 0.5, ex + er * 0.5, ey + er * 0.5], fill=(10, 40, 10, 255))
    # label
    f = font(40)
    fs = font(26)
    d.text((w / 2, h - 96), name, font=f, fill=(234, 251, 230, 255), anchor="mm")
    d.text((w / 2, h - 54), label, font=fs, fill=(174, 202, 166, 255), anchor="mm")
    img.convert("RGBA").save(os.path.join(OUT, name + ".png"))


def make_cutout(name, label, accent=ELECTRIC, w=800, h=800, egg=False):
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx, cy = w / 2, h / 2
    if egg:
        rw, rh = w * 0.32, h * 0.42
        d.ellipse([cx - rw, cy - rh, cx + rw, cy + rh], fill=(accent[0], accent[1], accent[2], 235))
    else:
        rw, rh = w * 0.3, h * 0.34
        d.ellipse([cx - rw, cy - rh * 1.1, cx + rw, cy + rh * 1.2],
                  fill=(accent[0], accent[1], accent[2], 240))
        # little feet
        d.ellipse([cx - rw * 0.7, cy + rh, cx - rw * 0.1, cy + rh * 1.5], fill=(accent[0], accent[1], accent[2], 240))
        d.ellipse([cx + rw * 0.1, cy + rh, cx + rw * 0.7, cy + rh * 1.5], fill=(accent[0], accent[1], accent[2], 240))
    # eyes
    er = w * 0.05
    for ox in (-0.12, 0.12):
        ex, ey = cx + w * ox, cy - h * 0.04
        d.ellipse([ex - er, ey - er, ex + er, ey + er], fill=WHITE)
        d.ellipse([ex - er * 0.5, ey - er * 0.5, ex + er * 0.5, ey + er * 0.5], fill=(10, 40, 10, 255))
    f = font(34)
    d.text((w / 2, h - 48), label, font=f, fill=(174, 202, 166, 255), anchor="mm")
    img.save(os.path.join(OUT, name + ".png"))


def make_logo():
    w, h = 1200, 360
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    em = Image.new("RGBA", (1000, 1000), (0, 0, 0, 0))
    stroke_path(ImageDraw.Draw(em), emblem_path()[0], emblem_path()[1], ELECTRIC)
    em = em.resize((300, 300), Image.LANCZOS)
    img.alpha_composite(em, (10, 30))
    d = ImageDraw.Draw(img)
    d.text((330, h / 2), "NIRMIE", font=font(180), fill=(0, 41, 0, 255), anchor="lm")
    img.save(os.path.join(OUT, "logo.png"))


def main():
    make_emblem("emblem-electric.png", ELECTRIC)
    make_emblem("emblem-forest.png", FOREST)
    make_emblem("emblem-white.png", WHITE)
    make_logo()

    scenes = {
        "scene-a": "Forêt magique",
        "scene-f": "Salon / événement",
        "scene-g": "Pilotage pro",
        "scene-h": "Anneau d'Ætheris",
        "scene-i": "Ville animée",
        "scene-k": "Office de tourisme",
        "scene-l": "Pyronis · feu",
        "scene-m": "Thalmyrs · eau",
        "scene-n": "Noctyrs · ombre",
        "scene-o": "Lumiris · lumière",
        "scene-p": "Zéphyris · vent",
        "scene-q": "Sylvanis · forêt",
        "scene-r": "Corruption",
        "glow-pose": "Collecte d'Ætheris",
        "halo-portrait": "Créateurs",
    }
    for k, v in scenes.items():
        make_scene(k, v)

    make_scene("map-pose", "Carte d'aventure", w=900, h=1600)

    make_cutout("cut-gromousse", "Gromousse")
    make_cutout("cut-gromousse2", "Gromousse · vivant")
    make_cutout("cut-gromousse3", "Gromousse · veille", accent=(150, 170, 150))
    make_cutout("cut-gromousse-knight", "Figurine NFC", accent=(120, 150, 60))
    make_cutout("cut-aeryn", "Aeryn", accent=(74, 168, 255))
    make_cutout("aeryn-veille", "Aeryn · cocon", accent=(120, 160, 200), egg=True)

    print("done ->", os.path.abspath(OUT))


if __name__ == "__main__":
    main()
