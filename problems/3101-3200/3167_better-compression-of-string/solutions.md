# Solutions — Better Compression of String

## Alphabetical run census

The input is a sequence of `letter + digits` runs, so one left-to-right scan
parses each letter and its following digit span, folding the parsed frequency
into a 26-slot census table. Because the same letter may appear in several
runs, the accumulation — not the emission order — does the real work; once
the scan finishes, walking the table from `'a'` to `'z'` and appending each
non-zero slot's letter and running total emits every character exactly once
in alphabetical order, which is precisely the "better" form.

Parsing digit spans by hand keeps the pass single-sweep and allocation-free:
each input character is inspected exactly once while reading and each of the
at-most-26 output slots is written once while emitting. Per-letter totals are
bounded by the number of runs times the maximum per-run frequency — with
length `6 * 10⁴` and runs of at least two characters (`letter` plus digits),
that is at most `3 * 10⁴ * 10⁴ = 3 * 10⁸`, inside 32-bit signed range for the
fixed-width languages and trivially exact in JavaScript doubles (far below
`2⁵³`).

**Complexity:** `O(n)` time for `n = len(compressed)`, `O(1)` space (the
census is fixed at 26 slots; the output itself is `O(26)` bounded).
