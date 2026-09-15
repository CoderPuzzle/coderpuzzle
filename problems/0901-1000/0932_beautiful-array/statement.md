# Beautiful Array

## Description

An array `nums` of length `n` is beautiful when:

- `nums` is a permutation of the integers in the range `[1, n]`.
- For every `0 <= i < j < n`, there is no index `k` with `i < k < j` where
  `2 * nums[k] == nums[i] + nums[j]`.

Given the integer `n`, return any beautiful array `nums` of length `n`. There is at
least one valid answer for the given `n`.

Several arrays can be beautiful for the same `n`, but this judge compares one exact
answer, so the required return is pinned to a single deterministic construction:
starting from `[1]`, repeatedly replace the array with the list of `2 * x - 1` for
each element `x` followed by the list of `2 * x` for each element `x`, until it has
at least `n` values, then keep the values `<= n` in their order.

### Example 1

```text
Input: n = 4
Output: [1,3,2,4]
Explanation: [1] doubles to [1,2], which doubles to [1,3,2,4] — already four
values, and none exceeds 4, so the final keep drops nothing. The array
[2,1,4,3] would also satisfy the definition above, but the pinned form is the
required answer.
```

### Example 2

```text
Input: n = 5
Output: [1,5,3,2,4]
Explanation: [1,3,2,4] doubles to [1,5,3,7,2,6,4,8]; keeping the values <= 5
leaves [1,5,3,2,4]. The array [3,1,2,5,4] would also satisfy the definition
above, but the pinned form is the required answer.
```

### Constraints

- `1 <= n <= 1000`
