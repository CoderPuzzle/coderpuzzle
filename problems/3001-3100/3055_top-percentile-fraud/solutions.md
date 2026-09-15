# Solutions — Top Percentile Fraud

## PERCENT_RANK window with a strict 5% cut

Percentile ranks must be computed per state, so the window function partitions by `state` and orders by `fraud_score DESC`, which puts each state's riskiest claim at rank 0. `PERCENT_RANK()` returns `(rank - 1) / (partition rows - 1)` for each row, so the top slice of each state yields values below 0.05; equal `fraud_score` values share a rank, meaning a tie group lands entirely on one side of the cut rather than being split.

The query wraps the window computation in a subquery (window results cannot be referenced in the same SELECT's WHERE) and filters `pr < 0.05` outside it. `fraud_score` is a real column and `PERCENT_RANK` produces floating-point values, so the comparison below 0.05 is float arithmetic; the strict `<` is exactly the cut the checker expects, applied as-is to the computed ranks.

Ordering is part of the answer: the final `ORDER BY state ASC, fraud_score DESC, policy_id ASC` reproduces the required presentation — states alphabetically, riskiest first within a state, ties broken by ascending `policy_id`.

**Complexity:** `O(n log n)` time, `O(n)` space.
