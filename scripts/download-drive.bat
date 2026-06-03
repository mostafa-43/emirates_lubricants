@echo off
echo Downloading products from Google Drive...
gdown --folder "https://drive.google.com/drive/folders/1g9GrbVxrdQO5F4YIrn6-KT55S5zBMfaV" -O "drive" --remaining-ok
echo Done. Run: npm run catalog
