# Solutions — Count the Number of Inversions

## Prefix-sum dynamic programming on inversion counts

Build the permutation left to right and track only dp[j]: the number of length-i prefixes having exactly j inversions. Appending the next element to a length i - 1 prefix creates between 0 and i - 1 new inversions depending on how many existing entries it overtakes, so dp_new[j] is the sliding-window sum of the old dp over j - (i - 1) .. j. A running prefix array turns each of those window sums into one subtraction, making the whole length transition linear in the number of tracked counts.

Prefix inversion counts never decrease as the permutation grows (appending can only add inversions), so any state above the largest required count can never descend back to a requirement and is safely discarded — the dp axis is capped at max_cnt, the biggest count appearing in requirements. Whenever index i - 1 carries a requirement, all dp[j] with j different from the demanded count are zeroed right after the transition; only exact matches survive into longer prefixes.

The guarantee that some requirement sits at end index n - 1 means the final answer is read directly as dp[req[n - 1]]. The i = 1 round skips the transition (a single element has zero inversions, and the length-2 step is the first that can add any), and the modular prefix sums keep the enormous permutation counts exact modulo 10⁹ + 7.

**Complexity:** `O(n · C)` time (C = max required inversion count ≤ 400), `O(C)` space.
