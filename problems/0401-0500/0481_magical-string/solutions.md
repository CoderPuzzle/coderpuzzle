# Solutions — Magical String

## Self-generation with two pointers

The string describes itself: split into runs of equal characters, the run
lengths concatenated spell the string again — "1 22 11 2 ..." has lengths
"1 2 2 1 ...", which is the string itself. That fixed point is what makes
generation possible with no outside source of counts. Seed the first three
elements 1, 2, 2 — one group of one, then one group of two — and the rule
supplies every later element from the prefix alone.

The code keeps a read pointer and a write pointer on one growing array.
`read` walks the already-written prefix as the count sequence; `flip` is the
character the next group is made of, alternating between 1 and 2 each time a
group is appended. Every turn appends `s[read]` copies of `flip`, then
advances `read` and flips. Because every count is 1 or 2, the write pointer
gains one or two elements per turn while `read` gains exactly one, so the
read pointer never catches the write pointer — every count it consults is
already on the table. The loop stops once `n` elements exist; the last group
may overshoot, which is harmless, and the answer is the number of 1s among
the first `n` elements.

**Complexity:** `O(n)` time, `O(n)` space.
