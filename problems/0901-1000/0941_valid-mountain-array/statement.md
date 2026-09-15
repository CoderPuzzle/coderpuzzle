# Valid Mountain Array

## Description

Given an integer array `arr`, return `true` if and only if it is a valid
mountain array.

Recall that `arr` is a mountain array if and only if:

- `arr.length >= 3`
- There exists some `i` with `0 < i < arr.length - 1` such that:
    - `arr[0] < arr[1] < ... < arr[i - 1] < arr[i]`
    - `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`

In words, the values climb strictly up to a single peak and then fall
strictly down to the very end. The peak cannot sit at either end of the
array, equal neighbors are forbidden on both slopes, and once the descent
begins it may never rise again.

![diagram](figures/941-1.svg)

### Example 1

```text
Input: arr = [2,1]
Output: false
Explanation: The array has only two elements, and a mountain needs at least
three to place a peak strictly inside it.
```

### Example 2

```text
Input: arr = [3,5,5]
Output: false
Explanation: The values climb to the 5 at index 1, but the following 5 is
equal rather than smaller, so the array never strictly descends from its
top.
```

### Example 3

```text
Input: arr = [0,3,2,1]
Output: true
Explanation: The values strictly climb 0 < 3 to the peak 3 at index 1, then
strictly fall 3 > 2 > 1 all the way to the end.
```

### Constraints

- `1 <= arr.length <= 10⁴`
- `0 <= arr[i] <= 10⁴`

## Hints

### Hint 1

Walk from the left while the values strictly increase. The index where that
climb stops is the only place a peak could be; from there the values must
strictly decrease to the very end — no plateau, and no second rise after
the descent starts.
