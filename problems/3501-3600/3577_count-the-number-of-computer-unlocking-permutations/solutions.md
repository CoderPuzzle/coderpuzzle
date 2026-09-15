# Solutions — Count the Number of Computer Unlocking Permutations

## Strict-minimum characterization with factorial count

Computer `i` can only be unlocked through some already-unlocked computer
`j < i` with lower complexity. Consider the leftmost minimum of the whole
array. If it is any label other than 0, every potential unlocker `j < i`
has `complexity[j] >= complexity[i]`, so that computer can never be
unlocked and no valid order exists. If it is label 0 — and only then — the
condition holds for free at every step: after 0, any next computer `i`
satisfies `0 < i` and `complexity[0] < complexity[i]`, and this stays true
no matter which computers have been unlocked so far. So the answer is
`(n − 1)!` when `complexity[0]` is a strict minimum of the array, and `0`
otherwise; the duplicates among the remaining computers never matter.

The scan rejects any later value `<= complexity[0]` in one pass, then
multiplies out `(n − 1)!` modulo `10⁹ + 7`. Each step multiplies a value
below `10⁹ + 7` by a multiplier of at most `10⁵`, so the intermediate
product stays near `10^14` — comfortably inside 64-bit (and exactly
representable as a JS `Number`) before the reduction.

**Complexity:** `O(n)` time, `O(1)` space.
