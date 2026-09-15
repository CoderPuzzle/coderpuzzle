# Sort Array By Parity

## Description

Given an integer array `nums`, move all the even integers at the beginning of
the array followed by all the odd integers.

Return any array that satisfies this condition.

Any array with every even value ahead of every odd value satisfies the
condition, but this judge compares one exact answer, so the required return is
pinned to a single deterministic form: the even values in the order they appear
in `nums`, followed by the odd values in the order they appear in `nums`.

### Example 1

```text
Input: nums = [3,1,2,4]
Output: [2,4,3,1]
Explanation: The even values 2 and 4 keep their input order, then the odd
values 3 and 1 keep theirs. The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3]
would also satisfy the condition, but the pinned form above is the required
answer.
```

### Example 2

```text
Input: nums = [0]
Output: [0]
```

### Constraints

- `1 <= nums.length <= 5000`
- `0 <= nums[i] <= 5000`
