# Per-column pipeline: the file is buffered once, and each output line
# comes from one cut that keeps only that column's field of every row;
# tr turns the column's newlines into the joining spaces and the command
# substitution plus printf restore one final newline. One rescan per
# column instead of per cell.
file=$(cat)
columns=$(printf '%s\n' "$file" | head -n 1 | wc -w)
for ((column = 1; column <= columns; column++)); do
    line=$(printf '%s\n' "$file" | cut -d ' ' -f"$column" | tr '\n' ' ' | sed 's/ $//')
    printf '%s\n' "$line"
done
