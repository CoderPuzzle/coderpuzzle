# Solutions — Taking Maximum Energy From the Mystic Dungeon

Once you pick a starting magician, the curse removes every remaining
decision: from `i` you hop to `i + k`, then `i + 2k`, and so on to the end
of the line. There are at most `k` distinct journeys, one per residue class,
and each is a suffix of a chain — exactly the shape dynamic programming over
suffix sums was made for, and what both hints point at.

## Backward DP on journey totals

Let `dp[i]` be the total energy gained by starting at index `i`. Its journey
is `energy[i]` plus the journey that begins at `i + k`, so the recurrence
`dp[i] = energy[i] + dp[i + k]` holds, with the base case `dp[i] = energy[i]`
when `i + k` falls off the line. Filling the table from the last index
backward therefore reads only cells already finished, and after one linear
pass the answer is simply the maximum entry — every legal start appears
somewhere in the table, so nothing else needs enumerating.

The arithmetic deserves its own sentence, because negative energies tempt
people into unsigned or narrow types. Any single journey visits at most `n`
cells, each of magnitude at most `1000`, so every intermediate `dp[i]` is
bounded by `10⁵ × 10³ = 10⁸` in absolute value — tight enough that even
32-bit integers would not overflow under these constraints. The solutions
below still accumulate in 64-bit types because the declared return contract
is 64-bit and widening costs nothing, and in JavaScript every value stays
many orders of magnitude below `2^53`, where `Number` is exact.

**Complexity:** `O(n)` time, `O(n)` space.
