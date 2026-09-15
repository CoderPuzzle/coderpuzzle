# K-th Smallest Remaining Even Integer in Subarray Queries

## Description

You are given an integer array nums where nums is strictly increasing.

You are also given a 2D integer array queries, where queries[i] = [li, ri, ki].

For each query [li, ri, ki]:

- Consider the subarray nums[li..ri]
- From the infinite sequence of all positive even integers: 2, 4, 6, 8, 10,
  12, 14, ...
- Remove all elements that appear in the subarray nums[li..ri].
- Find the kith smallest integer remaining in the sequence after the removals.

Return an integer array ans, where ans[i] is the result for the ith query.

### Example 1

```text
Input: nums = [1,4,7], queries = [[0,2,1],[1,1,2],[0,0,3]]
Output: [2,6,6]
Explanation:
i
queries[i]
nums[li..ri]
Removed Evens
Remaining Evens
ki
ans[i]

0
[0, 2, 1]
[1, 4, 7]
[4]
2, 6, 8, ...
1
2

1
[1, 1, 2]
[4]
[4]
2, 6, 8, ...
2
6

2
[0, 0, 3]
[1]
[]
2, 4, 6, ...
3
6

Thus, ans = [2, 6, 6].
```

### Example 2

```text
Input: nums = [2,5,8], queries = [[0,1,2],[1,2,1],[0,2,4]]
Output: [6,2,12]
Explanation:
i
queries[i]
nums[li..ri]
Removed Evens
Remaining Evens
ki
ans[i]

0
[0, 1, 2]
[2, 5]
[2]
4, 6, 8, ...
2
6

1
[1, 2, 1]
[5, 8]
[8]
2, 4, 6, ...
1
2

2
[0, 2, 4]
[2, 5, 8]
[2, 8]
4, 6, 10, 12, ...
4
12

Thus, ans = [6, 2, 12].
```

### Example 3

```text
Input: nums = [3,6], queries = [[0,1,1],[1,1,3]]
Output: [2,8]
Explanation:
i
queries[i]
nums[li..ri]
Removed Evens
Remaining Evens
ki
ans[i]

0
[0, 1, 1]
[3, 6]
[6]
2, 4, 8, ...
1
2

1
[1, 1, 3]
[6]
[6]
2, 4, 8, ...
3
8

Thus, ans = [2, 8].
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- nums is strictly increasing
- `1 <= queries.length <= 10⁵`
- `queries[i] = [li, ri, ki]`
- `0 <= li <= ri < nums.length`
- `1 <= ki <= 10⁹`

## Hints

### Hint 1

Binary search on the answer

### Hint 2

For each query, since nums is strictly increasing, you can find the count of
even integers in the range

### Hint 3

Subtract the count of even integers in the range from the current number you
are checking in the binary search, and check whether, after removing the
remaining numbers, this becomes the k-th
