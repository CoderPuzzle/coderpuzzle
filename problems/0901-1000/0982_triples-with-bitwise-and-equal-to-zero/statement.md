# Triples with Bitwise AND Equal To Zero

## Description

Given an integer array `nums`, return the number of AND triples.

An AND triple is a triple of indices `(i, j, k)` where all of the following
hold:

- `0 <= i < nums.length`
- `0 <= j < nums.length`
- `0 <= k < nums.length`
- `nums[i] & nums[j] & nums[k] == 0`, where `&` represents the bitwise-AND
  operator.

The three index ranges are independent: `(0, 1, 2)`, `(1, 0, 2)`, and
`(1, 1, 0)` are three different triples, and the indices need not differ.

### Example 1

```text
Input: nums = [2,1,3]
Output: 12
Explanation: We could choose the following i, j, k triples:
(i=0, j=0, k=1) : 2 & 2 & 1
(i=0, j=1, k=0) : 2 & 1 & 2
(i=0, j=1, k=1) : 2 & 1 & 1
(i=0, j=1, k=2) : 2 & 1 & 3
(i=0, j=2, k=1) : 2 & 3 & 1
(i=1, j=0, k=0) : 1 & 2 & 2
(i=1, j=0, k=1) : 1 & 2 & 1
(i=1, j=0, k=2) : 1 & 2 & 3
(i=1, j=1, k=0) : 1 & 1 & 2
(i=1, j=2, k=0) : 1 & 3 & 2
(i=2, j=0, k=1) : 3 & 2 & 1
(i=2, j=1, k=0) : 3 & 1 & 2
```

### Example 2

```text
Input: nums = [0,0,0]
Output: 27
```

### Constraints

- `1 <= nums.length <= 1000`
- `0 <= nums[i] < 2¹⁶`
