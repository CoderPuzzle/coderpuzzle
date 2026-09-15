# Count lines in the shell and stop as soon as the tenth arrives. IFS=
# and read -r preserve leading spaces and backslashes byte-for-byte.
line_number=0
while IFS= read -r line; do
    line_number=$((line_number + 1))
    if [ "${line_number}" -eq 10 ]; then
        printf '%s\n' "${line}"
        break
    fi
done
