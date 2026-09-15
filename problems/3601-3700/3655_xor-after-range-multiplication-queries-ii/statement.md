# XOR After Range Multiplication Queries II

## Description

You are given an integer array `nums` of length `n` and a 2D integer array
`queries` of size `q`, where `queries[i] = [li, ri, ki, vi]`.

Process the queries in order. Query `queries[i]` walks a stride-`ki`
sequence through `nums`: set `idx = li`, and while `idx <= ri`, replace
`nums[idx]` with `(nums[idx] * vi) mod (10⁹ + 7)` and then increase `idx`
by `ki`.

Return the bitwise XOR of all elements of `nums` after every query has been
processed.

### Example 1

```text
Input: nums = [1,1,1], queries = [[0,2,1,4]]
Output: 4
Explanation:
    The single query multiplies every element from index 0 through index 2
    by 4, changing the array from [1, 1, 1] to [4, 4, 4].
    The XOR of all elements is 4 ^ 4 ^ 4 = 4.
```

### Example 2

```text
Input: nums = [2,3,1,5,4], queries = [[1,4,2,3],[0,2,1,2]]
Output: 31
Explanation:
    The first query multiplies the elements at indices 1 and 3 by 3, giving
    [2, 9, 1, 15, 4].
    The second query multiplies the elements at indices 0, 1, and 2 by 2,
    giving [4, 18, 2, 15, 4].
    The XOR of all elements is 4 ^ 18 ^ 2 ^ 15 ^ 4 = 31.
```

### Constraints

- `1 <= n == nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `1 <= q == queries.length <= 10⁵`
- `queries[i] = [li, ri, ki, vi]`
- `0 <= li <= ri < n`
- `1 <= ki <= n`
- `1 <= vi <= 10⁵`

## Hints

### Hint 1

For `ki <= B`, where `B = sqrt(n)`: group the queries by `(ki, li mod ki)`.
Every query in one group walks positions of the same residue class, so a
difference array over that class' coordinates — writing `vi` at each
query's start coordinate and the modular inverse of `vi` just past its end
coordinate — records all of their multipliers; one prefix-product sweep of
the class then applies the whole group to `nums`.

### Hint 2

For `ki > B`: each query visits fewer than `sqrt(n) + 1` positions, so
applying it directly, exactly as the statement describes, is cheap enough —
at most `q * sqrt(n)` element updates across all such queries.
