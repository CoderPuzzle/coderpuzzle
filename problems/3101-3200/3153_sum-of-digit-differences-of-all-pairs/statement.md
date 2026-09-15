# Sum of Digit Differences of All Pairs

## Description

You are given an array nums consisting of positive integers where all
integers have the same number of digits.

The digit difference between two integers is the count of different digits
that are in the same position in the two integers.

Return the sum of the digit differences between all pairs of integers in
nums.

### Example 1

```text
Input: nums = [13,23,12]
Output: 4
Explanation: We have the following:
- The digit difference between 13 and 23 is 1.
- The digit difference between 13 and 12 is 1.
- The digit difference between 23 and 12 is 2.
So the total sum of digit differences between all pairs of integers is 1 + 1 + 2 = 4.
```

### Example 2

```text
Input: nums = [10,10,10,10]
Output: 0
Explanation: All the integers in the array are the same. So the total sum of digit differences between all pairs of integers will be 0.
```

### Constraints

- `2 <= nums.length <= 10⁵`
- `1 <= nums[i] < 10⁹`
- All integers in nums have the same number of digits.

## Hints

### Hint 1

You can solve the problem for digits that are on the same position
separately, and then sum up all the answers.

### Hint 2

For each position, count the number of occurences of each digit from 0 to
9 that appear on that position.

### Hint 3

Let c be the number of occurences of a digit on a position, that will
contribute with c * (n - c) to the final answer, where n is the number of
integers in nums.
