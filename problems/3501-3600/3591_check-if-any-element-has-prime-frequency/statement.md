# Check if Any Element Has Prime Frequency

## Description

You are given an integer array nums.

Return true if the frequency of any element of the array is prime,
otherwise, return false.

The frequency of an element x is the number of times it occurs in the
array.

A prime number is a natural number greater than 1 with only two factors, 1
and itself.

### Example 1

```text
Input: nums = [1,2,3,4,5,4]
Output: true
Explanation: 4 has a frequency of two, which is a prime number.
```

### Example 2

```text
Input: nums = [1,2,3,4,5]
Output: false
Explanation: All elements have a frequency of one.
```

### Example 3

```text
Input: nums = [2,2,2,4,4]
Output: true
Explanation: Both 2 and 4 have a prime frequency.
```

### Constraints

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 100`

## Hints

### Hint 1

Implement a function to check if a number is prime

### Hint 2

Find the frequencies of all the distinct elements in the array (using data
structures like map in C++), check if there is any element with prime
frequency
