# Single Number

## Description

Given a non-empty array of integers `nums`, every element appears twice
except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only
constant extra space.

### Example 1

```text
Input: nums = [2,2,1]
Output: 1
```

### Example 2

```text
Input: nums = [4,1,2,1,2]
Output: 4
```

### Example 3

```text
Input: nums = [1]
Output: 1
```

### Constraints

- `1 <= nums.length <= 3 * 10^4`
- `-3 * 10^4 <= nums[i] <= 3 * 10^4`
- Each element in the array appears twice except for one element which
  appears only once.

## Hints

### Hint 1

Think about the XOR (`^`) operator's property.

### Hint 2

Since `a ^ a = 0` and `a ^ 0 = a`, XOR-ing every element together cancels the pairs and leaves the single number.
