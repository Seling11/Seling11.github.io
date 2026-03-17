#!/usr/bin/env bash
set -euo pipefail

# One-click image optimization for this repo.
#
# What it does
# - Finds large project images under CV/assets (default: project-*.png/jpg/jpeg)
# - Generates a compressed WebP next to each image (same basename: project-5-b.webp)
# - Skips small files by default
# - Refuses to keep a WebP that ends up larger than the original
#
# Why WebP
# - Your CV page already prefers .webp when present, so after running this script
#   it will automatically load the smaller/faster versions.
#
# Requirements
# - macOS: `brew install webp` (provides `cwebp`)
#
# Usage
# - Run from repo root:
#   `bash CV/tools/optimize_images.sh`
#
# Optional knobs
#   --max 1600         # long-edge max (px), keep aspect ratio (default 1600)
#   --q 82             # WebP quality 0-100 (default 82)
#   --min-bytes 800000 # only process files >= this size (default 800000)
#   --force            # overwrite existing .webp
#   --dry-run          # print what would happen
#   --all              # include CV/assets/** (not only project-*), excluding existing .webp

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ASSETS_DIR="$ROOT_DIR/CV/assets"
WEBP_DIR="$ASSETS_DIR/webp"

MAX_PX=1600
QUALITY=82
MIN_BYTES=800000
FORCE=0
DRY_RUN=0
ALL=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --max) MAX_PX="$2"; shift 2;;
    --q) QUALITY="$2"; shift 2;;
    --min-bytes) MIN_BYTES="$2"; shift 2;;
    --force) FORCE=1; shift 1;;
    --dry-run) DRY_RUN=1; shift 1;;
    --all) ALL=1; shift 1;;
    -h|--help)
      sed -n '1,120p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown arg: $1" >&2
      exit 2
      ;;
  esac
done

if [[ ! -d "$ASSETS_DIR" ]]; then
  echo "Assets dir not found: $ASSETS_DIR" >&2
  exit 1
fi

mkdir -p "$WEBP_DIR"

if ! command -v cwebp >/dev/null 2>&1; then
  echo "Missing dependency: cwebp" >&2
  echo "Install on macOS: brew install webp" >&2
  exit 1
fi

# macOS stat size helper
file_size() {
  # shellcheck disable=SC2012
  stat -f%z "$1"
}

should_process() {
  local in="$1"
  local size
  size="$(file_size "$in")"
  [[ "$size" -ge "$MIN_BYTES" ]]
}

# Build input list
# - default: only CV/assets/project-*.png/jpg/jpeg (top-level)
# - --all: recursively include common raster formats, exclude .webp
inputs=()
if [[ "$ALL" -eq 1 ]]; then
  # Use -print0 to safely handle spaces/unicode in filenames.
  while IFS= read -r -d '' f; do
    inputs+=("$f")
  done < <(
    find "$ASSETS_DIR" -type f \( \
      -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \
    \) ! -iname "*.webp" -print0
  )
else
  while IFS= read -r -d '' f; do
    inputs+=("$f")
  done < <(
    find "$ASSETS_DIR" -maxdepth 1 -type f \( \
      -iname "project-*.png" -o -iname "project-*.jpg" -o -iname "project-*.jpeg" \
    \) -print0
  )
fi

if [[ "${#inputs[@]}" -eq 0 ]]; then
  echo "No matching images found under: $ASSETS_DIR" >&2
  exit 0
fi

processed=0
skipped_small=0
skipped_exists=0
skipped_bigger=0
failed=0

for in_path in "${inputs[@]}"; do
  if ! should_process "$in_path"; then
    skipped_small=$((skipped_small+1))
    continue
  fi

  # Output to a dedicated subfolder under CV/assets to keep the assets root tidy.
  # Preserve the relative path (so subfolders don't collide).
  rel_path="${in_path#"$ASSETS_DIR"/}"
  rel_no_ext="${rel_path%.*}"
  out_path="$WEBP_DIR/$rel_no_ext.webp"
  out_parent="$(dirname "$out_path")"
  mkdir -p "$out_parent"

  if [[ -f "$out_path" && "$FORCE" -ne 1 ]]; then
    skipped_exists=$((skipped_exists+1))
    continue
  fi

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "[dry-run] $rel_path -> webp/$rel_no_ext.webp"
    processed=$((processed+1))
    continue
  fi

  tmp_out="${out_path}.tmp.$$"
  rm -f "$tmp_out"

  # -resize $MAX_PX 0: constrain width to MAX_PX; if portrait, cwebp keeps aspect ratio
  # NOTE: cwebp's resize works as (width height). Using 0 means "keep aspect".
  if ! cwebp -q "$QUALITY" -m 6 -resize "$MAX_PX" 0 "$in_path" -o "$tmp_out" >/dev/null 2>&1; then
    echo "[fail] cwebp failed: $in_path" >&2
    rm -f "$tmp_out"
    failed=$((failed+1))
    continue
  fi

  in_size="$(file_size "$in_path")"
  out_size="$(file_size "$tmp_out")"

  if [[ "$out_size" -ge "$in_size" ]]; then
    rm -f "$tmp_out"
    skipped_bigger=$((skipped_bigger+1))
    continue
  fi

  mv -f "$tmp_out" "$out_path"
  processed=$((processed+1))
  echo "[ok] $(basename "$in_path") -> $(basename "$out_path")  (${in_size}B -> ${out_size}B)"
done

echo ""
echo "Done."
echo "- processed:       $processed"
echo "- skipped small:   $skipped_small (< ${MIN_BYTES}B)"
echo "- skipped exists:  $skipped_exists (use --force to overwrite)"
echo "- skipped bigger:  $skipped_bigger (webp >= original)"
echo "- failed:          $failed"
