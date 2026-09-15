# Contains Duplicate

## Description

Given an integer array `nums`, return `true` if any value appears at least
twice in the array, and return `false` if every element is distinct.

### Example 1

```text
Input: nums = [1,2,3,1]
Output: true
Explanation: The element 1 occurs at the indices 0 and 3.
```

### Example 2

```text
Input: nums = [1,2,3,4]
Output: false
Explanation: All elements are distinct.
```

### Example 3

```text
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

### Constraints

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## Hints

### Hint 1

A hash set records every value you have already seen in a single pass.

### Hint 2

The moment the current value is already in the set you have found a duplicate; if the pass finishes cleanly, all elements are distinct.
