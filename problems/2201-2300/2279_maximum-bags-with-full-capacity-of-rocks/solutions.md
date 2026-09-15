# Solutions — Maximum Bags With Full Capacity of Rocks

## Sort by remaining need

Bag i is short of full capacity by `capacity[i] - rocks[i]` rocks; bags with a
remaining need of 0 are already full. Placing rocks into a set of bags costs
the sum of their remaining needs, so the bags we complete should be the ones
with the smallest needs: if an optimal placement fills some bag while leaving
a cheaper bag unfilled, moving those rocks to the cheaper bag keeps every
filled bag filled and never spends more, so filling needs in ascending order
loses nothing.

The code computes every need, sorts them ascending, and walks the sorted list
spending `additionalRocks` greedily. It stops at the first need that does not
fit — every later need is at least as large — counting each bag it completes,
including the zero-need bags that cost nothing.

**Complexity:** `O(n log n)` time, `O(n)` space.
