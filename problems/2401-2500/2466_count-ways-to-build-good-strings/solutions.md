# Solutions — Count Ways To Build Good Strings

## Length Dynamic Programming

Two different good strings never collide unless their contents differ, but counting directly over contents is hopeless; count instead over lengths. Every good string of length `L` ends with either a block of `zero` zeros or a block of `one` ones, and removing that final block leaves a strictly shorter buildable string. This gives `dp[L] = dp[L-zero] + dp[L-one]` (when the indices are non-negative), with `dp[0] = 1` for the empty string — the unique way to build nothing.

Each string is counted exactly once because its final block type is determined by its last character, so the two addends describe disjoint, exhaustive cases, and recursively the decomposition down to the empty string is unique. This is the climb-stairs recurrence with two step sizes `zero` and `one`, and it counts distinct strings rather than distinct block sequences precisely because the letter choice at each step fixes the appended content.

The table runs from 1 to `high`, taking each entry modulo `10^9 + 7` as it is written so values stay bounded. The answer is the sum `dp[low] + ... + dp[high]` reduced once more, since every buildable string with length in `[low, high]` is good — length is the only acceptance criterion. Constraints guarantee `zero, one <= low`, so both transitions are live from the start, but the code's index guards would handle unreachable small lengths (they would simply contribute 0) and lengths below `min(zero, one)` staying at 0, which is correct: nothing shorter than the smallest block can be built.

**Complexity:** `O(high)` time, `O(high)` space.
