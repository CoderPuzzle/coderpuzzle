# Solutions — Subdomain Visit Count

Every count-paired domain fans its visit count out over all of its
suffixes — the domain itself and each subdomain cut at a dot — so the task
is one accumulation over suffix strings followed by one emission pass. The
statement pins the output order to ascending lexicographic by domain name,
which a final sort of the accumulated keys supplies directly.

## Dot-suffix fan-out into a hash map

Split each entry at its space into the count and the domain, then walk the
domain's dot positions: every suffix that starts at the front or right
after a dot is a visited subdomain, and the count lands on each one. A hash
map keyed by subdomain name does the accumulating, so repeated domains,
shared parents, and a subdomain that equals another entry's full domain all
fold into one total without special cases. Each entry contributes at most
three suffixes and every suffix is a slice of the entry's own characters,
so the sweep is linear in the input's total character count.

The answer is the map's entries sorted by domain name ascending — an
explicit comparator, never hash-table order — each rendered as
"count domain".

**Complexity:** `O(total characters)` time, `O(domains)` space.
