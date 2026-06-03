#!/usr/bin/env python3
"""Download Google Drive product categories one-by-one (avoids rate-limit failures)."""
import json
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DRIVE = ROOT / "drive"
MANIFEST = Path(__file__).resolve().parent / "drive-categories.json"
DELAY_SEC = 30
MAX_RETRIES = 4


def download_category(folder_id: str, name: str) -> bool:
    url = f"https://drive.google.com/drive/folders/{folder_id}"
    dest = DRIVE / name
    dest.mkdir(parents=True, exist_ok=True)

    for attempt in range(1, MAX_RETRIES + 1):
        print(f"\n[{name}] attempt {attempt}/{MAX_RETRIES}")
        cmd = [
            sys.executable,
            "-m",
            "gdown",
            "--folder",
            url,
            "-O",
            str(dest),
            "--remaining-ok",
        ]
        result = subprocess.run(cmd, capture_output=False)
        if result.returncode == 0:
            print(f"  OK: {name}")
            return True
        print(f"  Failed (exit {result.returncode}), waiting {DELAY_SEC * attempt}s...")
        time.sleep(DELAY_SEC * attempt)
    return False


def main():
    categories = json.loads(MANIFEST.read_text(encoding="utf-8"))
    DRIVE.mkdir(parents=True, exist_ok=True)

    ok, fail = 0, 0
    skip_existing = "--skip-existing" in sys.argv

    for cat in categories:
        name = cat["name"]
        dest = DRIVE / name
        if skip_existing and dest.exists() and any(dest.iterdir()):
            has_images = any(
                p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}
                for p in dest.rglob("*")
                if p.is_file()
            )
            if has_images:
                print(f"Skip (exists): {name}")
                ok += 1
                continue

        if download_category(cat["id"], name):
            ok += 1
        else:
            fail += 1
        time.sleep(DELAY_SEC)

    print(f"\nDone: {ok} ok, {fail} failed")
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
