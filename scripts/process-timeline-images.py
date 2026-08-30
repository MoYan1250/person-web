from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(
    r"C:\Users\approlu\.cursor\projects\f-PersonWeb\assets"
)
DISCORD_SRC = ASSETS / (
    "c__Users_approlu_AppData_Roaming_Cursor_User_workspaceStorage_"
    "0afb98435f0cfa45dcb19b5e0ebc8cba_images_2021-08-discord-"
    "763b813b-d47d-4a74-98b0-5f6d698d6cec.png"
)
YT_PAUSE_SRC = ASSETS / (
    "c__Users_approlu_AppData_Roaming_Cursor_User_workspaceStorage_"
    "0afb98435f0cfa45dcb19b5e0ebc8cba_images_image-adb4a5a6-"
    "ea9d-4fae-abd6-984989693345.png"
)
TIMELINE = ROOT / "public" / "timeline"


def is_dark(rgb: np.ndarray) -> np.ndarray:
    return (rgb[..., 0] < 45) & (rgb[..., 1] < 45) & (rgb[..., 2] < 45)


def flood_exterior_dark(dark: np.ndarray) -> np.ndarray:
    h, w = dark.shape
    exterior = np.zeros((h, w), dtype=bool)
    queue: deque[tuple[int, int]] = deque()

    for x in range(w):
        if dark[0, x]:
            queue.append((0, x))
        if dark[h - 1, x]:
            queue.append((h - 1, x))
    for y in range(h):
        if dark[y, 0]:
            queue.append((y, 0))
        if dark[y, w - 1]:
            queue.append((y, w - 1))

    while queue:
        y, x = queue.popleft()
        if exterior[y, x] or not dark[y, x]:
            continue
        exterior[y, x] = True
        if y > 0:
            queue.append((y - 1, x))
        if y + 1 < h:
            queue.append((y + 1, x))
        if x > 0:
            queue.append((y, x - 1))
        if x + 1 < w:
            queue.append((y, x + 1))

    return exterior


def process_discord_logo(src: Path, dest: Path) -> None:
    img = Image.open(src).convert("RGBA")
    arr = np.array(img, dtype=np.uint8)
    rgb = arr[..., :3]
    dark = is_dark(rgb)
    exterior = flood_exterior_dark(dark)
    interior_dark = dark & ~exterior

    alpha = np.full(arr.shape[:2], 255, dtype=np.uint8)
    alpha[exterior | interior_dark] = 0

    out = np.dstack([rgb, alpha])
    Image.fromarray(out, mode="RGBA").save(dest, optimize=True)


def copy_yt_pause(src: Path, dest: Path) -> None:
    Image.open(src).convert("RGBA").save(dest, optimize=True)


def main() -> None:
    TIMELINE.mkdir(parents=True, exist_ok=True)
    process_discord_logo(DISCORD_SRC, TIMELINE / "2021-08-discord.png")
    copy_yt_pause(YT_PAUSE_SRC, TIMELINE / "2025-05-yt-pause.png")
    print("Updated timeline images.")


if __name__ == "__main__":
    main()
