# Maximum Sum Obtained of Any Permutation

## Description

You are given an array of integers `nums` and an array of query ranges
`requests`, where `requests[i] = [starti, endi]`. The `i`-th request asks
for the sum `nums[starti] + nums[starti + 1] + ... + nums[endi]`, with
both `starti` and `endi` inclusive and 0-indexed.

You may rearrange `nums` into any permutation before the requests are
evaluated. Return the maximum possible total of all request sums, over
every permutation of `nums`. Since the answer can be very large, return it
modulo `10^9 + 7`.

### Example 1

```text
Input: nums = [1,2,3,4,5], requests = [[1,3],[0,1]]
Output: 19
Explanation: One permutation of nums is [2,1,3,4,5] with the following
result:
requests[0] -> nums[1] + nums[2] + nums[3] = 1 + 3 + 4 = 8
requests[1] -> nums[0] + nums[1] = 2 + 1 = 3
Total sum: 8 + 3 = 11.
A permutation with a higher total sum is [3,5,4,2,1] with the following
result:
requests[0] -> nums[1] + nums[2] + nums[3] = 5 + 4 + 2 = 11
requests[1] -> nums[0] + nums[1] = 3 + 5 = 8
Total sum: 11 + 8 = 19, which is the best that you can do.
```

### Example 2

```text
Input: nums = [1,2,3,4,5,6], requests = [[0,1]]
Output: 11
Explanation: A permutation with the max total sum is [6,5,4,3,2,1] with
request sums [11].
```

### Example 3

```text
Input: nums = [1,2,3,4,5,10], requests = [[0,2],[1,3],[1,1]]
Output: 47
Explanation: A permutation with the max total sum is [4,10,5,3,2,1] with
request sums [19,18,10].
```

### Constraints

- `n == nums.length`
- `1 <= n <= 10^5`
- `0 <= nums[i] <= 10^5`
- `1 <= requests.length <= 10^5`
- `requests[i].length == 2`
- `0 <= starti <= endi < n`

## Hints

### Hint 1

Indexes with higher frequencies should be bound with larger values.
