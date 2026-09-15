# Bitwise ORs of Subarrays

## Description

Given an integer array `arr`, return the number of distinct bitwise ORs of all
the non-empty subarrays of `arr`.

The bitwise OR of a subarray is the bitwise OR of each integer in the subarray.
The bitwise OR of a subarray of one integer is that integer.

A subarray is a contiguous non-empty sequence of elements within an array.

### Example 1

```text
Input: arr = [0]
Output: 1
Explanation: There is only one possible result: 0.
```

### Example 2

```text
Input: arr = [1,1,2]
Output: 3
Explanation: The possible subarrays are [1], [1], [2], [1, 1], [1, 2], [1, 1, 2].
These yield the results 1, 1, 2, 1, 3, 3.
There are 3 unique values, so the answer is 3.
```

### Example 3

```text
Input: arr = [1,2,4]
Output: 6
Explanation: The possible results are 1, 2, 3, 4, 6, and 7.
```

### Constraints

- `1 <= arr.length <= 5 * 10^4`
- `0 <= arr[i] <= 10^9`

## Hints

### Hint 1

Consider the subarrays that end at index i. The number of unique bitwise ORs among these is limited — each value has at most 30 set bits, so extending a set of OR results leftward can only produce a chain of at most 31 distinct values.

### Hint 2

Maintain the set of OR values of all subarrays ending at the current index: it is the new element ORed into each member of the previous set, plus the element alone.

### Hint 3

Union these per-index sets into one global set; its size is the answer.
