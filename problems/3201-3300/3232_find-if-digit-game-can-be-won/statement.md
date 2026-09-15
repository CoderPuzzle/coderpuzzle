# Find if Digit Game Can Be Won

## Description

You are given an array of positive integers `nums`.

Alice and Bob are playing a game. In the game, Alice can choose either all
single-digit numbers or all double-digit numbers from `nums`, and the rest
of the numbers are given to Bob. Alice wins if the sum of her numbers is
strictly greater than the sum of Bob's numbers.

Return `true` if Alice can win this game, otherwise, return `false`.

### Example 1

```text
Input: nums = [1,2,3,4,10]
Output: false
Explanation: Alice cannot win by choosing either single-digit or double-digit numbers.
```

### Example 2

```text
Input: nums = [1,2,3,4,5,14]
Output: true
Explanation: Alice can win by choosing single-digit numbers which have a sum equal to 15.
```

### Example 3

```text
Input: nums = [5,5,5,25]
Output: true
Explanation: Alice can win by choosing double-digit numbers which have a sum equal to 25.
```

### Constraints

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 99`

## Hints

### Hint 1

Alice wins if the sum of all single-digit numbers and the sum of all
double-digit numbers are different.
