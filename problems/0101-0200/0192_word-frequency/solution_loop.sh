# Naive baseline: list the distinct words first, then rescan the whole
# input once per word to count it. Correct, but each pass re-reads
# everything, so the cost grows with distinct words times total words.
input=$(cat)
printf '%s\n' "$input" | tr -s '[:space:]' '\n' | grep -v '^$' | sort -u |
    while read -r word; do
        count=$(printf '%s\n' "$input" | tr -s '[:space:]' '\n' | grep -cx "$word")
        printf '%s %d\n' "$word" "$count"
    done | sort -k2,2nr
