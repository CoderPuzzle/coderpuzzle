# Maximum Strength of a Group

## Description

You are given a 0-indexed integer array `nums` representing the score of
students in an exam. The teacher would like to form one non-empty group of
students with maximal strength, where the strength of a group of students of
indices i0, i1, i2, ... , ik is defined as `nums[i0] * nums[i1] * nums[i2] *
... * nums[ik]`.

Return the maximum strength of a group the teacher can create.

### Example 1

```text
Input: nums = [3,-1,-5,2,5,-9]
Output: 1350
Explanation: One way to form a group of maximal strength is to group the
students at indices [0,2,3,4,5]. Their strength is 3 * (-5) * 2 * 5 * (-9) =
1350, which we can show is optimal.
```

### Example 2

```text
Input: nums = [-4,-5,-4]
Output: 20
Explanation: Group the students at indices [0, 1] . Then, we’ll have a
resulting strength of 20. We cannot achieve greater strength.
```

### Constraints

- `1 <= nums.length <= 13`
- `-9 <= nums[i] <= 9`

## Hints

### Hint 1

Try to generate all pairs of subsets and check which group provides maximal
strength.

### Hint 2

It can also be solved in O(NlogN) by sorting the array and using all positive
integers.

### Hint 3

Use negative integers only in pairs such that their product becomes positive.
