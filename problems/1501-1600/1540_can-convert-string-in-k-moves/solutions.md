# Solutions — Can Convert String in K Moves

## Shift-need counting

Only the shift amount matters, not the exact move number that delivers it:
shifting by `x` and shifting by `x + 26` land on the same letter, since the
alphabet has 26 letters. So for each position where `s[i] != t[i]`, compute
the single required shift amount `d = (t[i] - s[i]) mod 26`, a value between
1 and 25, and tally how many positions need each `d` into `need_count[d]`.

Now ask, for each `d` separately, whether `k` moves are enough to deliver all
`need_count[d]` occurrences of that shift. A shift of exactly `d` can only be
produced by move number `d`, `d + 26`, `d + 52`, and so on, and every index
needing it must be assigned a distinct one of those move numbers (each move
number is usable once, and using earlier numbers first is always at least as
good as using later ones). So the cheapest way to cover all
`need_count[d]` occurrences uses moves `d, d + 26, ..., d + 26 * (need_count[d] - 1)`,
and the whole conversion is possible in `k` moves exactly when
`d + 26 * (need_count[d] - 1) <= k` for every `d` from 1 to 25. Different
values of `d` never compete for the same move number, so each `d` can be
checked independently and the answer is `true` only if all 25 checks pass.

**Complexity:** `O(n)` time, `O(1)` space.
