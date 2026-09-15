# Solutions — Count Binary Substrings

A substring that qualifies can only look like `0…01…1` or `1…10…0` — one
solid block of 0's against one equal block of 1's — because equal counts with
everything grouped force exactly two blocks of the same size. Each such
substring straddles one boundary where the string changes character, and no
substring straddles two, so the count splits cleanly over the boundaries: the
whole problem is how many centered pairs each boundary carries.

## Run lengths, one sweep

Fix a boundary and call `prev` the run length ending at it and `cur` the run
length starting after it. A valid substring centered there takes `m`
characters of the left run against `m` characters of the right run, so the
choices run from `m = 1` up to `min(prev, cur)` and stop: one more character
on the shorter side would reach past its run into a third block, and the
grouped property would break. The boundary therefore contributes exactly
`min(prev, cur)` substrings — the hint's `"000111"` gives `min(3, 3) = 3`
(`"01"`, `"0011"`, `"000111"`), `"11100"` gives `min(3, 2) = 2`, and their
concatenation `"00011100"` gives `3 + min(3, 2) = 5`.

The sweep keeps only those two numbers. Walking `s` once, it extends `cur`
while the character repeats and, at every change, banks `min(prev, cur)`,
demotes `cur` to `prev`, and restarts `cur` at 1 — so when the next boundary
arrives, `prev` is already the run that just closed. The last pair of runs has
no following change to trigger it, so the loop exits with one `min` still
unbanked and the return adds it. `"00110011"` walks runs `2, 2, 2, 2` and
returns `2 + 2 + 2 = 6`, matching the example, repeats included: equal runs
just donate the same amount at each boundary, exactly the multiplicity the
statement asks to count.

**Complexity:** `O(n)` time, `O(1)` space.
