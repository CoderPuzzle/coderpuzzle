# Solutions — Hash Divided String

## One running sum per chunk wraps to its answer letter

The division does all the structural work: since `n` is a multiple of `k`,
the chunks are simply the consecutive windows `s[i*k .. (i+1)*k)` — they tile
the string exactly, with no overlap and no leftover, so there is nothing to
search for. Each window collapses independently into one letter: add up the
alphabet indices of its characters, take the total modulo 26, and that
remainder is the position of the output character in the alphabet.

The arithmetic stays tiny by construction. A chunk holds at most `k <= 100`
letters, each contributing at most 25, so the running sum never exceeds
2500 and ordinary machine integers suffice — no wider counter is ever needed.
The modulo folds that whole range back onto `0..25` in one step, whatever the
chunk sums to: an all-`'a'` chunk totals 0 and stays `'a'`, a chunk summing
to exactly 26 wraps straight back around to `'a'`, and the heaviest possible
chunk — 100 copies of `'z'`, totalling 2500 — lands on `'e'` (2500 % 26 = 4).
Example 1 runs the two windows `"ab"` and `"cd"` through sums 1 and 5,
spelling `"bf"`.

Each of the `n` input characters is read exactly once and costs one addition,
so the work is linear in the string length; the output gathers `n / k`
characters into a fresh result string, which is the only extra storage held.

**Complexity:** `O(n)` time, `O(n/k)` space.
