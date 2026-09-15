# One grep: the extended pattern states the two allowed shapes and -E
# keeps it readable. grep streams the lines, prints the ones that match
# in full (^ and $ pin both ends), and drops everything else. The `||
# true` only covers the all-invalid file: with no matches grep exits 1,
# and an empty output must read as success, not an error.
grep -E '^([0-9]{3}-){2}[0-9]{4}$|^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$' || true
