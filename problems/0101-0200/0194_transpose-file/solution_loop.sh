# Naive baseline: buffer the file, then rebuild each output line by
# addressing one cell at a time — sed prints row `index`, cut takes
# field `column` — paying a whole-input rescan per cell.
file=$(cat)
lines=$(printf '%s\n' "$file" | wc -l)
columns=$(printf '%s\n' "$file" | head -n 1 | wc -w)
for ((column = 1; column <= columns; column++)); do
    row=
    for ((index = 1; index <= lines; index++)); do
        cell=$(printf '%s\n' "$file" | sed -n "${index}p" | cut -d ' ' -f"$column")
        row="$row $cell"
    done
    printf '%s\n' "${row# }"
done
