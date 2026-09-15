# Shuffle an Array

## Description

Given an integer array `nums`, design an algorithm to randomly shuffle the
array. All permutations of the array should be equally likely as a result of
the shuffling.

Implement the `Solution` class:

- `Solution(int[] nums)` Initializes the object with the integer array
  `nums`.
- `int[] reset()` Resets the array to its original configuration and returns
  it.
- `int[] shuffle()` Returns a random shuffling of the array.

### Statistical judging

`shuffle` must produce every one of the `n!` orderings **uniformly at
random**, exactly as on LeetCode — the judge verifies this statistically
rather than comparing single draws. Each judged `shuffle` is invoked many
times (the draw count grows with the table: ~10000 draws for three elements,
~170000 for five); every returned array must be a permutation of the
original, and the empirical frequency of each ordering must fall within a
tolerance band of its probability `1 / n!`. `reset` is compared exactly, so
shuffling must never corrupt the original configuration.

The statistical check is judged on small arrays — at most five elements,
where the full permutation table is enumerable. `reset` is compared exactly
whenever it appears.

### Example 1

```text
Input:
["Solution", "shuffle", "reset", "shuffle"]
[[[1, 2, 3]], [], [], []]
Output: [null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]
Explanation:
Solution solution = new Solution([1, 2, 3]);
solution.shuffle();    // Shuffle the array [1,2,3] and return its result.
                       // Any permutation of [1,2,3] must be equally likely
                       // to be returned. Example: return [3, 1, 2]
solution.reset();      // Resets the array back to its original
                       // configuration [1,2,3]. Return [1, 2, 3]
solution.shuffle();    // Returns a random shuffling of the array [1,2,3].
                       // Example: return [1, 3, 2]
```

### Example 2

```text
Input:
["Solution", "shuffle", "reset"]
[[[42]], [], []]
Output: [null, [42], [42]]
Explanation:
Solution solution = new Solution([42]);
solution.shuffle(); // A one-element array has exactly one permutation
solution.reset();   // return [42]
```

### Constraints

- `1 <= nums.length <= 50`
- `-10⁶ <= nums[i] <= 10⁶`
- All the elements of `nums` are unique.
- At most `10⁴` calls in total will be made to `reset` and `shuffle`.

## Hints

### Hint 1

`reset` stays cheap and correct only if shuffling never destroys the
original: keep a pristine copy in the constructor and produce each
`shuffle()` from a fresh copy of it, rather than shuffling the stored array
in place.

### Hint 2

Build the permutation one slot at a time: for `i` from `n - 1` down to `1`,
swap slot `i` with a uniformly random slot in `[0, i]`. Each step has
exactly `i + 1` outcomes, and every sequence of choices yields a distinct
final ordering, so the `n · (n-1) · … · 1` equally likely sequences cover all
`n!` orderings exactly once — this is Fisher-Yates.

### Hint 3

The tempting variant that swaps every slot with a uniformly random slot in
`[0, n)` is biased: the identity, for instance, is reachable through many
more swap sequences than a cyclic rotation, and counting equally likely
sequences is not the same as counting equally likely permutations. Keep the
candidate pool for slot `i` limited to the not-yet-fixed prefix.
