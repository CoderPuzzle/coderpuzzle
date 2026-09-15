# Identify the Largest Outlier in an Array

## Description

You are given an integer array nums. This array contains n elements, where
exactly n - 2 elements are special numbers. One of the remaining two
elements is the sum of these special numbers, and the other is an outlier.

An outlier is defined as a number that is neither one of the original
special numbers nor the element representing the sum of those numbers.

Note that special numbers, the sum element, and the outlier must have
distinct indices, but may share the same value.

Return the largest potential outlier in nums.

### Example 1

```text
Input: nums = [2,3,5,10]
Output: 10
Explanation: The special numbers could be 2 and 3, thus making their sum 5
and the outlier 10.
```

### Example 2

```text
Input: nums = [-2,-1,-3,-6,4]
Output: 4
Explanation: The special numbers could be -2, -1, and -3, thus making
their sum -6 and the outlier 4.
```

### Example 3

```text
Input: nums = [1,1,1,1,1,5,5]
Output: 5
Explanation: The special numbers could be 1, 1, 1, 1, and 1, thus making
their sum 5 and the other 5 as the outlier.
```

### Constraints

- `3 <= nums.length <= 10⁵`
- `-1000 <= nums[i] <= 1000`
- The input is generated such that at least one potential outlier exists in nums.

## Hints

### Hint 1

What will be the value of array sum if we remove the outlier from it?

### Hint 2

Use hashmap to find occurrence of an element quickly.
