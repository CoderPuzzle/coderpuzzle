# The k Strongest Values in an Array

## Description

Given an array of integers `arr` and an integer `k`.

A value `arr[i]` is said to be stronger than a value `arr[j]` if
`|arr[i] - m| > |arr[j] - m|`, where `m` is the centre of the array. If
`|arr[i] - m| == |arr[j] - m|`, then `arr[i]` is said to be stronger than
`arr[j]` if `arr[i] > arr[j]`.

Return a list of the strongest `k` values in the array. Return the answer
in any order.

The centre is the middle value in an ordered integer list. More formally,
if the length of the list is `n`, the centre is the element in position
`((n - 1) / 2)` in the sorted list (0-indexed).

- For `arr = [6, -3, 7, 2, 11]`, `n = 5`: sorting gives `[-3, 2, 6, 7, 11]`
  and the centre sits at `m = ((5 - 1) / 2) = 2`. The centre is `6`.
- For `arr = [-7, 22, 17, 3]`, `n = 4`: sorting gives `[-7, 3, 17, 22]`
  and the centre sits at `m = ((4 - 1) / 2) = 1`. The centre is `3`.

### Example 1

```text
Input: arr = [1,2,3,4,5], k = 2
Output: [5,1]
Explanation: The centre is 3. Sorting the array strongest-first yields
[5,1,4,2,3]; taking the first 2 values gives [5, 1]. [1, 5] is equally
acceptable. Note that although |5 - 3| == |1 - 3|, 5 is stronger than 1
because 5 > 1.
```

### Example 2

```text
Input: arr = [1,1,3,5,5], k = 2
Output: [5,5]
Explanation: The centre is 3. Sorted strongest-first the values are
[5,5,1,1,3], so the strongest 2 are [5, 5].
```

### Example 3

```text
Input: arr = [6,7,11,7,6,8], k = 5
Output: [11,8,6,6,7]
Explanation: The centre is 7. Sorted strongest-first the values are
[11,8,6,6,7,7]. Any permutation of [11,8,6,6,7] is accepted.
```

### Constraints

- `1 <= arr.length <= 10⁵`
- `-10⁵ <= arr[i] <= 10⁵`
- `1 <= k <= arr.length`

## Hints

### Hint 1

Compute the centre as defined in the statement.

### Hint 2

Sort the values strongest first with a custom comparator, then take the
first `k`.
