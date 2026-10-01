#!/usr/bin/env bash
# Self-improvement outer loop for OpenCode (macOS/Linux/WSL/Git-Bash).
# Usage: ./loop-improve.sh "your goal" [max_iters] [verify_dir]
# Example: ./loop-improve.sh "Reduce bundle size, keep build green" 5 sanskritisetu-prototype
set -u
GOAL="${1:-}"
MAX="${2:-5}"
VDIR="${3:-sanskritisetu-prototype}"

if [ -z "$GOAL" ]; then
  echo 'Usage: loop-improve.sh "goal" [max_iters] [verify_dir]'
  exit 1
fi

echo "[loop] goal: $GOAL"
echo "[loop] max: $MAX verify_dir: $VDIR"

for ((i=1; i<=MAX; i++)); do
  echo ""
  echo "===== Iter $i of $MAX ====="
  opencode run --command loop-improve "$GOAL (outer iteration $i of $MAX)" 2>&1 | tee .opencode/loop-last.txt
  if grep -q "LOOP_DONE" .opencode/loop-last.txt; then
    echo "[loop] LOOP_DONE at iter $i"
    break
  fi
  if grep -q "LOOP_BLOCKED" .opencode/loop-last.txt; then
    echo "[loop] blocked, stopping."
    exit 2
  fi
done

echo ""
echo "[loop] final verify: npm run build in $VDIR"
npm run build --prefix "$VDIR"
code=$?
if [ $code -eq 0 ]; then
  echo "[loop] VERIFY PASS"
else
  echo "[loop] VERIFY FAIL"
fi
exit $code
