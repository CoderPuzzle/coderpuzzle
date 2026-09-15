# Top K Frequent Elements

## Description

Given an integer array `nums` and an integer `k`, return the `k` most
frequent elements. You may return the answer in any order.

### Example 1

```text
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```

### Example 2

```text
Input: nums = [1], k = 1
Output: [1]
```

### Example 3

```text
Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2
Output: [1,2]
```

### Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `k` is in the range `[1, the number of unique elements in the array]`.
- It is guaranteed that the answer is unique.

### Follow-up

- Your algorithm's time complexity must be better than `O(n log n)`, where
  `n` is the array's size.

## Hints

### Hint 1

First count the frequency of every element with a hashmap.

### Hint 2

Bucket the elements by frequency: an element can appear at most n times, so there are only n buckets.

### Hint 3

Walk the buckets from the highest frequency to the lowest, collecting elements until you have k — this is O(n).
