# Handling Sum Queries After Update

## Description

You are given two 0-indexed arrays `nums1` and `nums2` and a 2D array `queries`
of queries. There are three types of queries:

- For a query of type 1, `queries[i] = [1, l, r]`. Flip the values from `0` to
  `1` and from `1` to `0` in `nums1` from index `l` to index `r`. Both `l` and
  `r` are 0-indexed.
- For a query of type 2, `queries[i] = [2, p, 0]`. For every index
  `0 <= i < n`, set `nums2[i] = nums2[i] + nums1[i] * p`.
- For a query of type 3, `queries[i] = [3, 0, 0]`. Find the sum of the elements
  in `nums2`.

Return an array containing all the answers to the third type queries.

### Example 1

```text
Input: nums1 = [1,0,1], nums2 = [0,0,0], queries = [[1,1,1],[2,1,0],[3,0,0]]
Output: [3]
Explanation: After the first query nums1 becomes [1,1,1]. After the second query, nums2 becomes [1,1,1], so the answer to the third query is 3. Thus, [3] is returned.
```

### Example 2

```text
Input: nums1 = [1], nums2 = [5], queries = [[2,0,0],[3,0,0]]
Output: [5]
Explanation: After the first query, nums2 remains [5], so the answer to the second query is 5. Thus, [5] is returned.
```

### Constraints

- `1 <= nums1.length, nums2.length <= 10⁵`
- `nums1.length == nums2.length`
- `1 <= queries.length <= 10⁵`
- `queries[i].length == 3`
- `0 <= l <= r <= nums1.length - 1`
- `0 <= p <= 10⁶`
- `0 <= nums1[i] <= 1`
- `0 <= nums2[i] <= 10⁹`

## Hints

### Hint 1

Process type-2 queries in O(1) if you know how many ones are currently in nums1.

### Hint 2

Use a lazy segment tree over nums1 that supports range flips and reports the total number of ones.

### Hint 3

Maintain the running sum of nums2 separately; a type-2 query with multiplier p adds p times the current number of ones.
