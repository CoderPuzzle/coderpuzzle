# Range XOR Queries with Subarray Reversals

## Description

You are given an integer array `nums` of length `n` and a 2D integer array `queries` of length `q`, where each query is one of the following three types:

- **Update:** `queries[i] = [1, index, value]` — Set `nums[index] = value`.
- **Range XOR Query:** `queries[i] = [2, left, right]` — Compute the bitwise XOR of all elements in the subarray `nums[left...right]`, and record this result.
- **Reverse Subarray:** `queries[i] = [3, left, right]` — Reverse the subarray `nums[left...right]` in place.

Return an array of the results of all range XOR queries in the order they were encountered.

### Example 1

```text
Input: nums = [1,2,3,4,5], queries = [[2,1,3],[1,2,10],[3,0,4],[2,0,4]]
Output: [5,8]
Explanation: Query 1 computes the XOR of the subarray [2,3,4], which is 5.
Query 2 sets nums[2] to 10, giving [1,2,10,4,5].
Query 3 reverses the whole array to [5,4,10,2,1].
Query 4 computes the XOR of that array, which is 8.
```

### Example 2

```text
Input: nums = [7,8,9], queries = [[1,0,3],[2,0,2],[3,1,2]]
Output: [2]
Explanation: Query 1 sets nums[0] to 3, giving [3,8,9].
Query 2 computes the XOR of [3,8,9], which is 2.
Query 3 reverses the subarray [8,9], leaving the array [3,9,8].
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁹`
- `1 <= queries.length <= 10⁵`
- `queries[i].length == 3`
- If `queries[i][0] == 1`:
    - `0 <= index < nums.length`
    - `0 <= value <= 10⁹`
- If `queries[i][0] == 2` or `queries[i][0] == 3`:
    - `0 <= left <= right < nums.length`

## Hints

### Hint 1

Augment each AVL tree node with fields for subtree XOR, size, and a lazy reversal flag to efficiently update and query segments.

### Hint 2

Use split and merge operations on the AVL tree to isolate subarrays for point updates, range XOR queries, and reversals in O(log n) time.
