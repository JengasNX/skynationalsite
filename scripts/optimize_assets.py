"""
Prepare production assets for the SkyNational Community site.

Reads  : skynational/assets-source/  (original files provided by the owner)
Writes : skynational/public/assets/  (optimized JPG + PNG with stable names)
         skynational/public/favicon.ico / favicon.png / apple-touch-icon.png

Run: python scripts/optimize_assets.py
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets-source"
OUT = ROOT / "public" / "assets"
OUT.mkdir(parents=True, exist_ok=True)

# source file -> (output name, max width, jpeg quality)
PHOTOS = {
    "file_0000000075588211b1c346ba3d5a1cc3.png": ("night-flight.jpg", 1920, 82),
    "image.png": ("gallery-united-tail.jpg", 1600, 82),
    "IMG_7376bcv.png": ("gallery-a350-gate.jpg", 1600, 82),
    "zv.png": ("gallery-ryanair-dusk.jpg", 1600, 82),
    "432.png": ("gallery-aa-cargo.jpg", 1600, 82),
    "43234.png": ("gallery-su34-takeoff.jpg", 1600, 82),
    "4325.png": ("gallery-su34-sunset.jpg", 1600, 82),
    "hgf.png": ("gallery-f18-dusk.jpg", 1600, 82),
}

LOGO_SRC = "3922c254a292e783273c8e1f59709a75.webp"

# Brand navy, sampled from the logo itself (most common dark pixel).
NAVY = (27, 42, 143)


def save_photo(src_name: str, out_name: str, max_w: int, quality: int) -> None:
    src = SRC / src_name
    if not src.exists():
        print(f"  ! missing {src_name}")
        return
    img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    if img.width > max_w:
        h = round(img.height * max_w / img.width)
        img = img.resize((max_w, h), Image.LANCZOS)
    dst = OUT / out_name
    img.save(dst, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"  {out_name}: {img.width}x{img.height}, {dst.stat().st_size // 1024} KB")


def make_og_image() -> None:
    """1200x630 crop of the night-flight photo for Open Graph cards."""
    src = OUT / "night-flight.jpg"
    if not src.exists():
        return
    img = Image.open(src).convert("RGB")
    target_ratio = 1200 / 630
    w, h = img.size
    if w / h > target_ratio:
        nw = round(h * target_ratio)
        left = (w - nw) // 2
        img = img.crop((left, 0, left + nw, h))
    else:
        nh = round(w / target_ratio)
        top = (h - nh) // 2
        img = img.crop((0, top, w, top + nh))
    img = img.resize((1200, 630), Image.LANCZOS)
    img.save(OUT / "og-image.jpg", "JPEG", quality=85, optimize=True, progressive=True)
    print("  og-image.jpg: 1200x630")


def logo_alpha(pixels: list[tuple[int, int, int, int]], lum_logo: float):
    """Map darkness to alpha so white background disappears, edges stay smooth."""
    span = max(255 - lum_logo, 1)
    out = []
    for r, g, b, _ in pixels:
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        a = int(round((255 - lum) * 255 / span))
        out.append((r, g, b, max(0, min(255, a))))
    return out


def make_logo() -> None:
    src = SRC / LOGO_SRC
    if not src.exists():
        print(f"  ! missing logo {LOGO_SRC}")
        return
    img = Image.open(src).convert("RGB")

    # sample the average colour of the dark strokes
    dark = [p for p in img.getdata() if 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2] < 120]
    if dark:
        global NAVY
        NAVY = tuple(sum(ch[i] for ch in dark) // len(dark) for i in range(3))  # type: ignore

    lum_logo = 0.299 * NAVY[0] + 0.587 * NAVY[1] + 0.114 * NAVY[2]
    rgba = [(*p, 255) for p in img.getdata()]
    alpha = logo_alpha(rgba, lum_logo)

    # navy version (light theme)
    navy = Image.new("RGBA", img.size)
    navy.putdata([(NAVY[0], NAVY[1], NAVY[2], a) for *_, a in alpha])
    navy.save(OUT / "logo-skn.png")

    # white version (dark theme)
    white = Image.new("RGBA", img.size)
    white.putdata([(255, 255, 255, a) for *_, a in alpha])
    white.save(OUT / "logo-skn-light.png")

    # icons
    favicon = navy.resize((512, 512), Image.LANCZOS)
    favicon.save(OUT / "favicon.png")
    favicon.resize((180, 180), Image.LANCZOS).save(OUT / "apple-touch-icon.png")
    (ROOT / "public").mkdir(parents=True, exist_ok=True)
    navy.resize((64, 64), Image.LANCZOS).save(
        ROOT / "public" / "favicon.ico", format="ICO", sizes=[(32, 32), (16, 16), (48, 48)]
    )
    print(f"  logo-skn.png / logo-skn-light.png / favicon ({NAVY[0]},{NAVY[1]},{NAVY[2]})")


def main() -> int:
    if not SRC.exists():
        print(f"assets-source not found: {SRC}")
        return 1
    print("photos:")
    for src_name, (out_name, max_w, q) in PHOTOS.items():
        save_photo(src_name, out_name, max_w, q)
    print("social:")
    make_og_image()
    print("logo:")
    make_logo()
    return 0


if __name__ == "__main__":
    sys.exit(main())
