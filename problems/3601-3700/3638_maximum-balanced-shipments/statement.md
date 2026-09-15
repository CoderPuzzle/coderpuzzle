# Maximum Balanced Shipments

## Description

A row of `n` parcels sits in a fixed order, and `weight[i]` is the weight of
the i-th parcel (0-indexed). A shipment is any contiguous run of parcels, and
a shipment is balanced when its last parcel weighs strictly less than the
heaviest parcel inside that same run.

Choose as many shipments as you can under two rules: the chosen shipments
never overlap, and each parcel belongs to at most one of them. Parcels are
allowed to stay unshipped. Return the maximum possible number of balanced
shipments.

### Example 1

```text
Input: weight = [2,5,1,4,3]
Output: 2
Explanation: Take the run [2,5,1] — its last parcel weighs 1, strictly less
than the run's maximum of 5. Then take [4,3] — 3 is strictly less than 4.
No selection forms more than two balanced shipments.
```

### Example 2

```text
Input: weight = [4,4]
Output: 0
Explanation: The run [4,4] ends with a parcel equal to the run's maximum,
and a single-parcel run always ends at its own maximum, so nothing can ship.
```

### Constraints

- `2 <= n <= 10⁵`
- `1 <= weight[i] <= 10⁹`

## Hints

### Hint 1

Use a monotonic stack to find, for each end index `i`, the nearest previous
index `j` with `weight[j] > weight[i]` (set `j = -1` if none). A balanced
shipment ending at `i` must begin at or before `j`.

### Hint 2

Then set `dp[i] = best[j - 1] + 1` (using `best[-1] = 0`), where `best`
carries the running prefix maximum of `dp`, and return `best[n - 1]`. A
single scan that keeps only the open segment's running maximum computes the
same answer in constant space.
