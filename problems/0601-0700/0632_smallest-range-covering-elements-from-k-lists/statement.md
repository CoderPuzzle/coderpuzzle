# Smallest Range Covering Elements from K Lists

## Description

You have `k` lists of sorted integers in non-decreasing order. Find the
smallest range that includes at least one number from each of the `k` lists.

We define the range `[a, b]` is smaller than range `[c, d]` if `b - a < d - c`
or `a < c` if `b - a == d - c`.

### Example 1

```text
Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation:
List 1: [4, 10, 15, 24, 26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].
```

### Example 2

```text
Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
Output: [1,1]
```

### Constraints

- `nums.length == k`
- `1 <= k <= 3500`
- `1 <= nums[i].length <= 50`
- `-10^5 <= nums[i][j] <= 10^5`
- `nums[i]` is sorted in non-decreasing order.

## Hints

### Hint 1

Keep one pointer per list; the range [min, max] of the current pointed-to elements is a candidate answer.

### Hint 2

Repeatedly remove the current minimum and advance the pointer of the list it came from; a min-heap gives the minimum in O(log k).

### Hint 3

The candidate range can only improve when the minimum moves up, so stop as soon as the list owning the minimum is exhausted.

### Hint 4

When two candidate ranges have the same length, the one with the smaller left endpoint wins.
