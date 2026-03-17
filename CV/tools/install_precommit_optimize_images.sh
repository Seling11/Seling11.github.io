#!/usr/bin/env bash
set -euo pipefail

# Installs a local git pre-commit hook that runs CV/tools/optimize_images.sh
# before each commit, so large images automatically get a .webp generated.
#
# Note: git hooks are local to your machine and are NOT committed to the repo.
#
# Usage (from repo root):
#   bash CV/tools/install_precommit_optimize_images.sh

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
HOOK_DIR="$ROOT_DIR/.git/hooks"
HOOK_PATH="$HOOK_DIR/pre-commit"

if [[ ! -d "$HOOK_DIR" ]]; then
  echo "No .git/hooks found. Are you in a git repo?" >&2
  exit 1
fi

cat > "$HOOK_PATH" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

# Auto-generate compressed WebP versions for large CV images.
# Keep this fast by only touching the default project-* images.

bash CV/tools/optimize_images.sh >/dev/null
EOF

chmod +x "$HOOK_PATH"

echo "Installed pre-commit hook: $HOOK_PATH"
echo "It will run: bash CV/tools/optimize_images.sh"
