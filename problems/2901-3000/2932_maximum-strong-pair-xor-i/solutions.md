# Solutions — Maximum Strong Pair XOR I

The definition alone already plans the small case: try every way to pick
two integers, keep the pairs that satisfy the kindred condition, and
report the best XOR among them. Sorting the values sharpens the condition
into something local. For the larger member `x`, a partner `y <= x`
qualifies exactly when `x <= 2y`, so each `x`'s partners are precisely the
values in a contiguous window over the sorted order, and that window only
ever loses values from its left edge as the sweep moves on — two pointers
maintain it in one pass. A set of the window's binary prefixes then turns
"pick `x`'s best partner" into a short walk down `x`'s bits, one lookup
per level.

## Check every pair

The constraints are tiny — at most `50` values, each at most `100` — so the
direct reading of the definition is already fast enough: try every way to
pick two integers and keep the best XOR among the pairs that qualify. The
pair condition is symmetric in `x` and `y`, and picking the same integer
twice is explicitly allowed, so it is enough to loop over the pairs
`nums[i]` and `nums[j]` with `j >= i`; that covers every unordered pair plus
the `(x, x)` pairs, which are always strong and always contribute `0`.

A pair `(x, y)` with `x <= y` is strong exactly when `y - x <= x`, so the
check is one subtraction and one comparison per candidate. Every XOR value
involved is below `128` (two numbers at most `100` differ only in their low
seven bits), so plain 32-bit integers are comfortable in every language and
no special width handling is needed. Whenever a candidate beats the running
maximum, it replaces it; the maximum starts at `0`, which is already a valid
answer for any input because `(x, x)` is always strong.

**Complexity:** `O(n^2)` time, `O(1)` space.

## Bit-Prefix Hash Set over a Sorted Window

Sorting makes the kindred condition one-sided. Every partner `y` of the
larger member `x` satisfies `y <= x`, so `|x - y| <= min(x, y)` reads
`x - y <= y`, or `x <= 2y`. The partners of a given `x` are therefore
exactly the earlier values `y >= x / 2` — a contiguous run ending right
before `x` in the sorted order — and the run only ever shrinks from its
left: a value too small for this `x` is too small for every later one,
because the sweep meets `x` in increasing order. Two pointers maintain
the window in a single pass.

The window changes as it shrinks, so the sweep carries the window's
binary prefixes in count maps rather than a trie: each value contributes
the prefixes of its seven bits, one entry per bit length — every value is
at most `100`, so seven bits cover them all — and each entry carries a
count, one small hash map per level. When a value leaves the window its
seven counts drop, and prefixes shared with surviving values merely
decrement. Placing `x` is then a walk down its bits from the top: the
code holds the prefix of `x` tried so far and the answer bits decided so
far, and keeps the next bit exactly when the partner prefix completing it
— `prefix ^ (ans * 2 + 1)`, the value the window would have to contain
for that bit to stay — is present at that level. Seven lookups settle
`x`'s best partner where the brute force met the whole window.

Two details keep the bookkeeping honest. Values equal to `x` stay in the
window — they satisfy `x <= 2y` trivially — though equal values XOR to
`0`, so they neither help nor hurt. And a window can empty out entirely,
when `x` exceeds twice every earlier value; every lookup then misses and
`x` contributes nothing, so the running maximum, which starts at `0`
thanks to the always-kindred `(x, x)` pairs, is never disturbed.

**Complexity:** `O(n log n)` time, `O(n)` space.
