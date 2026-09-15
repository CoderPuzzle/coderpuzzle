# Pancake Sorting

## Description

Given an array of integers `arr`, sort the array by performing a series of
pancake flips.

In one pancake flip you choose an integer `k` with `1 <= k <= arr.length`
and reverse the sub-array `arr[0..k-1]`. For example, flipping `[3,2,1,4]`
with `k = 3` reverses `[3,2,1]`, so the array becomes `[1,2,3,4]`.

Return an array of the `k`-values of a sequence of pancake flips that
sorts `arr`.

Any answer that sorts the array within `10 * arr.length` flips is a valid
answer to the puzzle, but this judge compares one exact answer, so the
required return is pinned to a single deterministic sequence: place the
values largest-to-bottom. For each size `s` from `arr.length` down to `2`,
locate the value `s` — the largest value of the not-yet-sorted prefix
`arr[0..s-1]`. If it already sits at index `s-1`, perform no flip.
Otherwise, if it is not at index `0`, first perform the flip whose `k` is
its index plus one, bringing it to the front; then perform the flip with
`k = s`, carrying it to index `s-1`. Record the `k` of every performed
flip, in order.

### Example 1

```text
Input: arr = [3,2,4,1]
Output: [3,4,2,3,2]
Explanation: The pinned sequence performs 5 flips. Starting from
[3,2,4,1]: k = 3 brings 4 to the front and k = 4 carries it to the back,
giving [1,3,2,4]; k = 2 brings 3 to the front and k = 3 carries it to
index 2, giving [2,1,3,4]; a final k = 2 swaps 1 and 2, giving [1,2,3,4].
The shorter sequence [4,2,4,3] would also sort the array, but the pinned
sequence above is the required answer.
```

### Example 2

```text
Input: arr = [1,2,3]
Output: []
Explanation: The array is already sorted — every value sits at index s-1,
so no flip is performed. Sequences such as [3,3] would also sort it, but
the pinned answer is the empty sequence.
```

### Constraints

- `1 <= arr.length <= 100`
- `1 <= arr[i] <= arr.length`
- All integers in `arr` are unique — `arr` is a permutation of the
  integers from `1` to `arr.length`.
