# Reduce Array Size to The Half

## Approach: Greedy on descending frequencies

Choosing a set of values removes, for each chosen value, all its
occurrences — so a set of size k removes the sum of k value-frequencies,
and the goal is the fewest values whose frequencies sum to at least half
the array. The optimal choice is always the k highest frequencies: for any
fixed k, the descending order maximizes the removed count, so the smallest
feasible k is found by accumulating frequencies largest-first until the
half is reached.

One counting pass builds the frequency table, the frequencies are sorted
descending, and the running sum crosses the threshold after k terms.

**Complexity:** O(n + m log m) time with m distinct values, O(m) space.
