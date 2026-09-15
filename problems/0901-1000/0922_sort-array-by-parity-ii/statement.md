# Sort Array By Parity II

## Description

Given an integer array `nums`, half of the integers in `nums` are odd, and
the other half are even.

Sort the array so that whenever `nums[i]` is odd, `i` is odd, and whenever
`nums[i]` is even, `i` is even.

Return any answer array that satisfies this condition.

Any arrangement whose even indices all hold even values and whose odd indices
all hold odd values satisfies the condition, but this judge compares one exact
answer, so the required return is pinned to a single deterministic form: the
even values sorted in ascending order filling the even indices, and the odd
values sorted in ascending order filling the odd indices.

### Example 1

```text
Input: nums = [4,2,5,7]
Output: [2,5,4,7]
Explanation: The sorted even values 2 and 4 fill the even indices, and the
sorted odd values 5 and 7 fill the odd indices. The outputs [4,5,2,7],
[4,7,2,5], and [2,7,4,5] would also satisfy the condition, but the pinned
form above is the required answer.
```

### Example 2

```text
Input: nums = [2,3]
Output: [2,3]
```

### Constraints

- `2 <= nums.length <= 2 * 10⁴`
- `nums.length` is even.
- Half of the integers in `nums` are even.
- `0 <= nums[i] <= 1000`

### Follow-up

Could you solve it in place?
