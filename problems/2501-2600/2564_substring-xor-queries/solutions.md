# Solutions — Substring XOR Queries

## Bounded-window value dictionary

Solving `val ^ first == second` for the wanted substring decouples every
query from the string: `val = first XOR second`. Because both query
operands stay below `10⁹ < 2³⁰`, the value can never need more than 30
bits, so per hint 1 no substring longer than 30 characters is ever worth
decoding. Preprocessing therefore enumerates windows of lengths
`1..min(30, n)` only — a `30 · n` sweep instead of the `n²`-window naive
alternative.

The pick order falls out of the enumeration shape rather than extra logic.
Lengths run outer ascending and window starts inner ascending, so the very
first sighting of any decoded value already has the shortest length and,
within it, the leftmost start — exactly the statement's tie rule. Windows
that begin with `'0'` are skipped once past length one: they decode to the
value of their trailing suffix, which the strictly shorter pass by that
same start region (or an even earlier one) recorded beforehand. Each query
is then a single hash lookup of `first ^ second`, falling back to
`[-1, -1]`.

Decodes fit comfortably in machine words: a full 30-bit window tops out at
`2³⁰ − 1 ≈ 1.07 · 10⁹`, inside signed 32-bit range, so plain `int`
arithmetic works everywhere including JavaScript's Numbers.

**Complexity:** `O(30 · n + q)` time, `O(min(number of distinct window
values, 30 · n))` space for the dictionary.
