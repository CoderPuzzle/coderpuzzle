# Maximum Total Sum with Threshold Constraints

## Description

You are given two integer arrays `nums` and `threshold`, both of length
`n`.

Starting with `step = 1`, you repeatedly do the following:

- Choose an unused index `i` such that `threshold[i] <= step`. If no such
  index exists, the process ends.
- Add `nums[i]` to your running total, mark index `i` as used, and
  increment `step` by 1.

Return the maximum total sum you can obtain by choosing indices
optimally.

### Example 1

```text
Input: nums = [1,10,4,2,1,6], threshold = [5,1,5,5,2,2]
Output: 17
Explanation: At step = 1, choose i = 1 since threshold[1] <= 1. The total
becomes 10. At step = 2, choose i = 4 since threshold[4] <= 2. The total
becomes 11. At step = 3, choose i = 5 since threshold[5] <= 3. The total
becomes 17. At step = 4, indices 0, 2, and 3 all have thresholds greater
than 4, so the process ends.
```

### Example 2

```text
Input: nums = [4,1,5,2,3], threshold = [3,3,2,3,3]
Output: 0
Explanation: At step = 1 there is no index i with threshold[i] <= 1, so
the process ends immediately and the total sum is 0.
```

### Example 3

```text
Input: nums = [2,6,10,13], threshold = [2,1,1,1]
Output: 31
Explanation: Take every index in turn — at step = 1 only i = 1 is
eligible, and from then on each new step unlocks the next index, so all
four values are collected for 2 + 6 + 10 + 13 = 31.
```

### Constraints

- `1 <= n == nums.length == threshold.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `1 <= threshold[i] <= n`

## Hints

### Hint 1

An element becomes usable exactly when the current step reaches its
threshold, and once usable it stays usable. Group the elements by the
step at which they unlock.

### Hint 2

Simulate the process: at each step, add every element that just unlocked
to a max-heap of usable values, then take the heap's top as this step's
pick. The process ends the first time the heap is empty.
