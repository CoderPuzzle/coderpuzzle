# Solutions — Maximum Value of a String in an Array

Each string scores independently: a run of digits reads as its base-10
number (leading zeros simply fold away — `"00000"` is 0), while any string
carrying a letter falls back to its own length. The answer is just the
largest score, so the whole task is one faithful pass over `strs`.

## Per-string digit test

For every element, decide with a single character scan whether it is all
digits; if so convert it numerically, otherwise use its length, and keep
the running maximum. Constraints cap both dimensions (`100` strings of at
most `9` characters), and nine digits top out at `999999999`, comfortably
inside every language's native integer range — no widening needed. Each
language leans on its idiomatic parse path (Python's `isdigit` + `int`,
JS's `/^\d+$/` + `Number`, Rust's `parse::<i32>` fallthrough), all of
which agree byte-for-byte on this alphabet.

**Complexity:** `O(S)` time over the total characters `S <= 900`,
`O(1)` extra space.
