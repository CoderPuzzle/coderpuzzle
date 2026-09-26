# Solutions

The solution uses prefix dynamic programming.

## Prefix dynamic programming

Let `dp[i]` be the minimum cost after exactly the first `i` positions have been finalized. If the next source and target characters already match, that position may remain unused and advance the state at no cost.

Otherwise, or in addition, test every rule at position `i`. A rule creates an edge to the end of its range only when its wildcard pattern matches the original source slice and its replacement equals the target slice; disjointness is automatic because transitions always advance to the first unused position.

![For source=hello → target=world, the dp strip fills 0, ∞, 3, ∞, ∞, 7 as the rule edges he→wo (+3) and llo→rld (+4) span boundaries 0→2 and 2→5, and the free l=l match at position 3 goes unused.](figures/solution-prefix-dp-rule-edges.svg)

**Complexity:** O(n · rules · maxPatternLength) time and O(n) space.
