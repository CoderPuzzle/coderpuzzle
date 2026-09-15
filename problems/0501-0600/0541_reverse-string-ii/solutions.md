# Solutions — Reverse String II

## One reversed window per 2k block

Read the string as a row of consecutive `2k`-sized blocks. The rule asks exactly one thing of each block: its first `k` characters come out reversed, its last `k` characters stay where they are. So the code walks `i` over the block starts in steps of `2k` and reverses the single window `s[i:i+k]`, then hands back the assembled result. `"abcdefgh"` with `k = 4` is one full block — `abcd` flips to `dcba` while `efgh` never moves.

The two tail clauses of the statement are not special cases at all — they are what the clamped slice does by itself. When fewer than `k` characters remain, `s[i:i+k]` runs past the end and comes back short, so reversing it reverses _all_ of the remaining characters. When between `k` and `2k - 1` remain, the slice is exactly the first `k` of them and the untouched rest falls outside the window, which is the "reverse the first `k`, leave the other as original" clause verbatim. `k` larger than the whole string collapses to the first situation: one short window covering everything, one full reversal. On `"abcdefg"` with `k = 2` the blocks start at 0 and 4: `ab` → `ba` and `ef` → `fe`, with `cd` and the lone `g` untouched, giving `"bacdfeg"`.

Every character is visited a constant number of times — each block's two windows partition it — and the work inside a window is proportional to its size, so the whole pass is linear. The output is a fresh string of the same length (a character copy the windows are reversed inside), which is also the space cost: `O(n)` for the buffer the answer is built in.

**Complexity:** `O(n)` time, `O(n)` space.
