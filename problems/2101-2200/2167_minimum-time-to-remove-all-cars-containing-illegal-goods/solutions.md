# Solutions — Minimum Time to Remove All Cars Containing Illegal Goods

## Kadane-Style Minimum Subarray Sum

Every '1' car must go, while '0' cars may be removed or kept. Removals from either end cost 1 per car, and interior removals cost 2, so any plan is: cut a prefix of `l` cars from the left, a suffix from the right, and pay 2 for each '1' remaining strictly inside — interior '0's can simply stay. For a kept middle segment `s[l..r]`, the cost is `l + (n − 1 − r) + 2·ones(l..r)`, and rewriting `n` as the segment length plus both removed tails turns this into `n` plus the sum of `+1` for each '1' and `−1` for each '0' inside the segment: a middle '1' costs 2 but refunds the 1 an end deletion would have cost (net `+1`), while a middle '0' simply saves that 1 (net `−1`).

The problem is therefore to minimize the sum of that ±value array over any contiguous segment, allowing the empty segment (corresponding to deleting everything from the ends, cost exactly `n`). That is Kadane's algorithm run for minima: `min_end` tracks the best segment ending at the current character (`min(value, min_end + value)`, restarting whenever that is better) and `best` tracks the overall minimum, initialized to 0 so the empty segment is always a candidate.

The answer is `n + best`, and since the empty-segment floor is built in, the result can never exceed `n`. One pass over the string with two scalars does all the work.

**Complexity:** `O(n)` time, `O(1)` space.
