"""Create web-sized JPEGs from photos-arjen originals."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "photos-arjen"
OUT = ROOT / "public" / "photos"

REGULAR = [
    ("IMG_20251207_134318.jpg", "arjen-sahil.jpg"),
    ("IMG_20251207_134321.jpg", "arjen-sahil-koy.jpg"),
    ("IMG_20251207_135836.jpg", "arjen-kordon.jpg"),
    ("IMG_20251207_135832.jpg", "arjen-dalga.jpg"),
    ("IMG_20251207_152737.jpg", "arjen-kopuk.jpg"),
    ("IMG_20251012_173032.jpg", "arjen-gokkusagi.jpg"),
    ("IMG_20251207_140127.jpg", "arjen-yesilyuva.jpg"),
    ("IMG_20251207_140226.jpg", "arjen-piknik.jpg"),
    ("IMG_20251207_140632.jpg", "arjen-orman.jpg"),
    ("IMG_20251207_151101.jpg", "arjen-mesire.jpg"),
    ("IMG_20250918_141720.jpg", "arjen-meydan.jpg"),
    ("IMG_20250919_160842.jpg", "arjen-palmiye.jpg"),
    ("IMG_20251008_163505.jpg", "arjen-kasaba.jpg"),
    ("IMG_20251219_155935.jpg", "arjen-konak.jpg"),
    ("IMG_20260411_195856.jpg", "arjen-gunbatimi.jpg"),
    ("IMG_20260401_182212.jpg", "arjen-bayrak.jpg"),
    ("IMG_20260419_192419.jpg", "arjen-kayalik.jpg"),
    ("IMG_20260401_182357.jpg", "arjen-falez.jpg"),
    ("IMG_20250918_083813.jpg", "arjen-yokus.jpg"),
]


def save_jpeg(image: Image.Image, dest: Path, max_size: tuple[int, int], quality: int) -> None:
    image = image.convert("RGB")
    image.thumbnail(max_size, Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    image.save(dest, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"{dest.name:28} {image.size[0]}x{image.size[1]}  {dest.stat().st_size / 1e6:.2f}MB")


def main() -> None:
    for src_name, dest_name in REGULAR:
        with Image.open(SRC / src_name) as im:
            save_jpeg(im, OUT / dest_name, (1920, 1440), 82)

    with Image.open(SRC / "IMG_20251207_140715.jpg") as im:
        save_jpeg(im, OUT / "arjen-pano-yesilyuva.jpg", (4800, 1200), 80)

    with Image.open(SRC / "IMG_20250919_160711.jpg") as im:
        rotated = im.rotate(-90, expand=True)
        save_jpeg(rotated, OUT / "arjen-pano-sahil.jpg", (4800, 1200), 80)

    with Image.open(SRC / "IMG_20251231_233507.jpg") as im:
        save_jpeg(im, OUT / "arjen-pano-gece.jpg", (3200, 1600), 80)


if __name__ == "__main__":
    main()
