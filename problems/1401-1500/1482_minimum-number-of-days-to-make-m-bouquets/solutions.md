# Solutions — Minimum Number of Days to Make m Bouquets

## Binary Search on the Answer

If m bouquets can be made on day d, they can also be made on any later day, since blooming only ever adds flowers. The set of feasible days is therefore an upward-closed range, and binary search on the day is valid: the search maintains an infeasible lower bound and a feasible upper bound and shrinks the interval until they meet at the first feasible day.

Feasibility of a candidate day is checked greedily in one pass over the garden. A running counter accumulates consecutive bloomed flowers — those whose bloom day is at most the candidate — and whenever the run reaches k, one bouquet is complete and the run resets; a single unbloomed flower zeroes the run. This scan extracts exactly floor(L / k) bouquets from each maximal bloomed run of length L, which is the most any partition can yield, since bouquets cannot span an unbloomed flower. The day is feasible once the count reaches m.

The search interval is bounded below by the earliest bloom day and above by the latest, because no flower blooms before the first day and the whole garden is open by the last. Impossible instances are filtered out before the search begins: when m times k exceeds the number of flowers there can never be enough material, so the function returns -1; otherwise the top of the interval is always feasible. Writing D for the maximum bloom day, the binary search performs about log D feasibility checks of linear cost each.

**Complexity:** `O(n log D)` time, `O(1)` space.
