# Solutions — Two City Scheduling

## Sort by cost difference

Imagine first sending everyone to city B, at total cost `sum(b_i)`. Exactly `n` people must be switched to city A, and switching person `i` changes the total by `a_i - b_i` — a quantity independent of every other person. The cheapest plan is therefore obtained by applying the `n` most negative (smallest) differences, which is exactly what the code does: sort by `cost[0] - cost[1]` ascending, charge `cost[0]` for the first half and `cost[1]` for the second half.

An exchange argument shows the sorted split is optimal: if some person with a larger difference flew to A while another with a smaller difference flew to B, swapping their destinations changes the total by the difference of the two differences, which is negative — the swap never increases cost. Hence an optimal solution exists in sorted order, and no tie-breaking is needed because equal differences leave the total unchanged either way.

The counting constraint is satisfied structurally — the split sends exactly half to each city — so no assignment search is required at all.

**Complexity:** `O(n log n)` time, `O(n)` space for the sorted copy.
