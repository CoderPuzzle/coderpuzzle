# Solutions — Special Binary String

A swap can only trade two adjacent special blocks, so the top-level
special substrings are the movable pieces, and each of them hides the same
problem one level down. The answer is therefore built recursively: repair
every block from the inside out, then lay the blocks out largest-first —
one decomposition, one climb, one sort.

## Maximize mountains from the inside, sort them descending

Walk the string with a running count that steps +1 on `1` and -1 on `0`;
each time the count returns to zero, a top-level special substring — a
mountain — has just closed. A mountain's interior is itself a special
string (the count stays positive until the mountain's closing `0`), so
recursing on the interior, maximizing it, and only then re-wrapping the
outer `1...0` is a legal way to climb inside a single mountain: example 1
is exactly this, `"11011000"` wrapping its maximized interior `"110010"`
into `"11100100"`. The recursion bottoms out at the empty interior of the
unit mountain `"10"`.

Once every mountain is individually maximal, the only moves left act
between adjacent mountains, and swapping cannot change the multiset of
blocks — only their order. The lexicographically largest concatenation of
a fixed set of strings is their descending order, so sorting the maximized
mountains descending and joining ends the move sequence. Nesting depth is
at most half the length (each level consumes an outer `1...0` pair), so
plain recursion is safe at the stated bound.

**Complexity:** `O(n² log n)` time, `O(n)` space.
