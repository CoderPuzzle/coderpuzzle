# Procedural baseline: read the lines one at a time and let the shell's
# own pattern matching decide. case patterns name every literal character
# of the two allowed shapes, so a line either matches a shape completely
# or is skipped.
while IFS= read -r line; do
    case "$line" in
    [0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9] | "("[0-9][0-9][0-9]") "[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9])
        printf '%s\n' "$line"
        ;;
    esac
done
