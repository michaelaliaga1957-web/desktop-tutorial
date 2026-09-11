#!/usr/bin/env python3
"""
Build the web-sized images in v2/img/ from the originals.

Every source here is a real Esplendor job photo. Nothing is stock,
nothing is generated. Crop, resize and a light grade only — no vehicle,
environment or equipment is ever altered.

    python3 v2/build-images.py
"""

import os
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except ImportError:
    pass  # only needed while .HEIC originals are present

SRC = "assets/gallery/originals"
OUT = "v2/img"


def load(name):
    for ext in (".HEIC", ".jpg", ".jpeg", ".webp", ".png"):
        p = os.path.join(SRC, name + ext)
        if os.path.exists(p):
            return Image.open(p).convert("RGB")
    raise FileNotFoundError(f"{name} not found in {SRC}")


def cover(im, aspect, fy=0.5, fx=0.5):
    """Crop to `aspect` (w/h), keeping the region around the focal point."""
    w, h = im.size
    if w / h > aspect:                      # too wide -> trim sides
        nw, nh = int(h * aspect), h
    else:                                   # too tall -> trim top/bottom
        nw, nh = w, int(w / aspect)
    x = min(max(int(w * fx - nw / 2), 0), w - nw)
    y = min(max(int(h * fy - nh / 2), 0), h - nh)
    return im.crop((x, y, x + nw, y + nh))


def obscure(im, boxes):
    """Make licence plates and house numbers unreadable, so a customer's
    vehicle or address can't be lifted off the site.

    Downscale-then-upscale first (that genuinely destroys the detail — a
    blur alone can be sharpened back), then soften the blocks so the patch
    reads as depth of field rather than a censor bar."""
    if not boxes:
        return im
    im = im.copy()
    w, h = im.size
    for x0, y0, x1, y1 in boxes:
        bx = (int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h))
        pad = int(max(bx[2] - bx[0], bx[3] - bx[1]) * 0.35)
        r = (max(bx[0] - pad, 0), max(bx[1] - pad, 0),
             min(bx[2] + pad, w), min(bx[3] + pad, h))
        patch = im.crop(r)
        pw, ph = patch.size
        # Size the blocks to the box, not the patch, so roughly six blocks
        # span the plate whatever its pixel size — few enough that no
        # character shape survives.
        block = max(8.0, (bx[2] - bx[0]) / 6)
        tiny = patch.resize((max(2, int(pw / block)), max(2, int(ph / block))),
                            Image.BILINEAR)
        patch = tiny.resize((pw, ph), Image.NEAREST)
        patch = patch.filter(ImageFilter.GaussianBlur(block * 0.7))
        # Draw the mask from the box itself, not an inset of the padded
        # patch — otherwise a box touching the frame edge keeps a sharp
        # sliver. Grow it so the interior stays fully opaque after feathering.
        grow = pad * 0.35
        mask = Image.new("L", (pw, ph), 0)
        ImageDraw.Draw(mask).rectangle(
            (bx[0] - r[0] - grow, bx[1] - r[1] - grow,
             bx[2] - r[0] + grow, bx[3] - r[1] + grow), fill=255)
        mask = mask.filter(ImageFilter.GaussianBlur(max(4, pad * 0.40)))
        im.paste(patch, r[:2], mask)
    return im


def grade(im, contrast=1.06, color=1.04, bright=1.0):
    im = ImageEnhance.Contrast(im).enhance(contrast)
    im = ImageEnhance.Color(im).enhance(color)
    return ImageEnhance.Brightness(im).enhance(bright)


def write(im, name, width, quality=82):
    im = im.resize((width, round(width * im.size[1] / im.size[0])), Image.LANCZOS)
    path = os.path.join(OUT, name + ".webp")
    im.save(path, "WEBP", quality=quality, method=6)
    print(f"  {name+'.webp':22s} {im.size[0]}x{im.size[1]}  {os.path.getsize(path)//1024}KB")


# Boxes are normalised to the FINAL cropped image, not the original.
PLATES = {
    "hero":         [(0.686, 0.545, 0.756, 0.606),   # customer's rear plate
                     (0.415, 0.310, 0.467, 0.362)],  # house number on the brick
    "band":         [(0.245, 0.758, 0.306, 0.810)],
    "work-cruiser": [(0.630, 0.845, 0.800, 0.920)],
    "work-foam":    [(0.000, 0.590, 0.175, 0.715)],
    "work-kit":     [(0.680, 0.524, 0.768, 0.568)],
}

# name            source      aspect  focus-y  focus-x  width  grade
JOBS = [
    # ── full-bleed: text sits on these, so they run slightly darker ──
    ("hero",        "IMG_4017", 16/9,  0.47, 0.50, 2400, dict(contrast=1.06, color=1.05, bright=1.03)),
    ("band",        "IMG_4254", 21/9,  0.40, 0.52, 2400, dict(contrast=1.05, color=1.07, bright=1.06)),

    # ── package cards ──
    ("svc-exterior","IMG_3501", 16/10, 0.46, 0.50, 1500, dict()),
    ("svc-superwash","IMG_4043",16/10, 0.52, 0.50, 1500, dict(bright=1.02)),
    ("svc-interior","IMG_4037", 16/10, 0.50, 0.52, 1500, dict(bright=1.02)),

    # ── Real Work gallery (4:5) ──
    ("work-kit",    "IMG_3491", 4/5,   0.56, 0.50, 1200, dict()),
    ("work-foam",   "IMG_3498", 4/5,   0.50, 0.50, 1200, dict()),
    ("work-lexus",  "IMG_4049", 4/5,   0.50, 0.50, 1200, dict(bright=1.02)),
    ("work-cruiser","IMG_4246", 4/5,   0.48, 0.50, 1200, dict()),
    ("work-cargo",  "IMG_4228", 4/5,   0.50, 0.50, 1200, dict(bright=1.02)),
    ("work-moto",   "IMG_3818", 4/5,   0.52, 0.50, 1200, dict()),
    ("work-doors",  "IMG_4230", 4/5,   0.50, 0.50, 1200, dict(bright=1.02)),
    ("work-white",  "IMG_4040", 4/5,   0.50, 0.50, 1200, dict()),

    # ── genuine before / after: same vehicle, same footwell, same visit ──
    ("before",      "3",        4/5,   0.50, 0.50, 1100, dict()),
    ("after",       "4",        4/5,   0.50, 0.50, 1100, dict()),
]


def main():
    os.makedirs(OUT, exist_ok=True)
    print(f"building {len(JOBS)} images -> {OUT}/")
    for name, src, aspect, fy, fx, width, g in JOBS:
        im = obscure(cover(load(src), aspect, fy, fx), PLATES.get(name))
        im = grade(im, **g)
        write(im, name, width)


if __name__ == "__main__":
    main()
