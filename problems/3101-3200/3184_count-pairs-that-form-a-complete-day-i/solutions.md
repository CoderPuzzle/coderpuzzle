# Solutions — Count Pairs That Form a Complete Day I

The constraint caps the array at one hundred entries, so there are at
most `4950` unordered index pairs to examine — small enough that no data
structure is needed at all. One pass materializes each value's residue
mod 24, then two nested loops test every pair once: a pair forms a
complete day precisely when its residue sum vanishes mod 24.

Working on residues rather than raw values is more than cosmetic.
Individual entries reach `10⁹`, so a naive `hours[i] + hours[j]` climbs
to `2 × 10⁹`, past the signed 32-bit maximum of about `2.15 × 10⁹`; the
wrapped result would silently misclassify pairs in Java, C++, and Rust.
Two residues, by contrast, never exceed `46`.

## Reduce to residues, scan every pair

Counting takes one increment per qualifying pair and returns directly,
matching the crawl's own hint (`(hours[i] + hours[j]) % 24 == 0`) while
sidestepping its overflow hazard. The loop order keeps `i < j`, which is
exactly the statement's index convention, so nothing is counted twice or
skipped. The scale makes any counting-bucket alternative unnecessary here
— that machinery earns its keep in the larger twin problem.

**Complexity:** `O(n²)` time, `O(n)` space.
