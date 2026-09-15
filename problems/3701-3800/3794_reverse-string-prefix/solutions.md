# Solutions — Reverse String Prefix

## Two-Pointer Prefix Reversal

Only the first k characters are affected, and a reversal pairs each prefix
position i with its mirror k - 1 - i: copying one onto the other in mirror
order is exactly what reversing means. So take two pointers at the prefix's
ends and swap the characters they name, stepping both inward after every
swap. Each swap fixes two positions at once, and a position is never
visited again after it is fixed.

The loop stops when the pointers meet or cross — at that moment every pair
inside the prefix has been exchanged once, so the prefix is reversed and
the suffix s[k:] was never touched. The degenerate ends need no special
cases: k = 1 leaves the pointers adjacent-equal so the body never runs,
and k = n simply extends the reversal over the whole string. Since the
constraint guarantees 1 <= k <= s.length, no bounds check is required.

Strings are immutable in every language here except C++ (where the
by-value parameter already is the working copy), so the sweep runs on a
mutable buffer — a char list, array, or byte vector — and the buffer is
rebuilt into the answer afterwards. The input is guaranteed lowercase
ASCII, so byte-wise swapping in Go and Rust is character-wise. With
floor(k / 2) swaps and one pass to build and one to rebuild, the work is
a small constant per character.

**Complexity:** `O(n)` time, `O(n)` space.
