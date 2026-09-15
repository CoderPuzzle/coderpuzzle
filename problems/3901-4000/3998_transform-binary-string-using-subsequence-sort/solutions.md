# Solutions

The solution uses rightmost wildcard assignment with prefix checks.

## Rightmost wildcard assignment with prefix checks

Sorting a binary subsequence never moves a `1` leftward. Therefore a completed query is reachable exactly when it has the same total number of ones as `s` and its ones count never exceeds that of `s` at any prefix.

For each query, first determine how many wildcards must become ones to match the total. Assign those ones to the rightmost wildcard positions, which minimizes the ones count in every prefix, and then scan once to check the prefix condition.

**Complexity:** O(n q) time and O(n) space.
