# Solutions — String Compression

## Two pointers, read and write

The compression never needs a second array. A group of `k` equal characters
compresses to `1 + digits(k)` slots — the character plus the decimal digits
of its count — and that is never more than `k` for any group longer than one
character, while a lone character stays a single slot. The compressed form is
therefore never longer than the text it replaces, so it can be built at the
front of `chars` itself, overwriting input that has already been read. Two
indexes do the whole job: `read` walks the groups, `write` marks where the
next compressed character goes.

The loop starts each group at `read` and scans forward while the characters
still equal `chars[read]` — the run ends exactly where that equality breaks,
which is what the hint points at. The group's character is written once, and
when the count exceeds `1` its decimal digits follow as separate slots: the
twelve `b`s of Example 3 become `b`, `1`, `2`, which is what the statement's
note about group lengths of `10` or longer requires. Then `read` jumps to the
group's end and the next group begins. Because a group of `k` characters
consumes at most `k` write slots, `write` never passes `read`, so no write
can clobber input the scan still needs.

Only the two indexes and the run count live outside the array, which keeps
the pass inside the statement's constant-extra-space rule. The in-place
rewrite is performed exactly as described; the judge observes only the
returned length, and that length is the final `write` index — the first
`write` characters of `chars` hold the compressed string.

**Complexity:** `O(n)` time, `O(1)` space.
