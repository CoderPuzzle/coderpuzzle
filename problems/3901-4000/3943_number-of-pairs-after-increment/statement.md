# Number of Pairs After Increment

## Description

You are given integer arrays `nums1`, `nums2`, and `queries`. A query is either `[1, x, y, val]`, which adds `val` to every value in `nums2[x..y]`, or `[2, tot]`, which asks for the number of pairs `(j, k)` satisfying `nums1[j] + nums2[k] == tot`.

Return the answers to all type-2 queries in order.

### Example 1

```text
Input: nums1 = [1,2], nums2 = [3,4], queries = [[2,5],[1,0,0,2],[2,5]]
Output: [2,1]
```

### Example 2

```text
Input: nums1 = [1,1], nums2 = [2,2,3], queries = [[2,4],[1,0,1,1],[2,4]]
Output: [2,6]
```

### Example 3

```text
Input: nums1 = [2,5,8,4], nums2 = [1,3,8], queries = [[2,9],[1,1,2,1],[2,10]]
Output: [1,0]
```

### Constraints

- `1 <= nums1.length <= 5`
- `1 <= nums2.length <= 5 * 10⁴`
- `1 <= nums1[i], nums2[i] <= 10⁵`
- `1 <= queries.length <= 5 * 10⁴`
- A query has form `[1, x, y, val]` or `[2, tot]`.
- `0 <= x <= y < nums2.length`, `1 <= val <= 10⁵`, `1 <= tot <= 10⁹`

## Hints

### Hint 1

Split `nums2` into square-root-sized blocks with a lazy addition and a frequency map per block.

### Hint 2

Push and rebuild partial blocks; increment only the lazy value for complete blocks.
