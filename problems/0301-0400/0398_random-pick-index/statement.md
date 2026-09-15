# Random Pick Index

## Description

Given an integer array `nums` with possible duplicates, randomly output the
index of a given target number. You can assume that the given target number
must exist in the array.

Implement the `Solution` class:

- `Solution(int[] nums)` Initializes the object with the array `nums`.
- `int pick(int target)` Picks a random index `i` from `nums` where
  `nums[i] == target`. If there are multiple valid `i`'s, then each index
  should have an equal probability of returning.

### Statistical judging

`pick` chooses uniformly among the indices holding `target`, exactly as on
LeetCode — the judge verifies this statistically rather than comparing a
single draw. Each judged `pick` is invoked tens of thousands of times (the
draw count scales with how many indices the target occupies, up to ~180000
draws), every returned index must satisfy `nums[i] == target`, and the
empirical frequency of each qualifying
index must fall within a tolerance band of its probability `1 / m`, where
`m` is the number of positions holding `target`. Any correct uniform sampler
passes.

The frequency check needs enough draws per index, so the statistically
judged targets occupy up to ~120 positions; a target spread over an entire
10⁴-element array is still fully validity-checked (every draw must land on
one of its indices).

### Example 1

```text
Input:
["Solution", "pick", "pick", "pick"]
[[[1, 2, 3, 3, 3]], [3], [1], [3]]
Output: [null, 4, 0, 2]
Explanation:
Solution solution = new Solution([1, 2, 3, 3, 3]);
solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each
                  // index should have equal probability of returning.
solution.pick(1); // It should return 0. Since in the array only nums[0] is
                  // equal to 1.
solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each
                  // index should have equal probability of returning.
```

### Example 2

```text
Input:
["Solution", "pick", "pick"]
[[[8, 8]], [8], [8]]
Output: [null, 0, 1]
Explanation:
Solution solution = new Solution([8, 8]);
solution.pick(8); // returns 0 or 1, each with probability 1/2
solution.pick(8); // returns 0 or 1, each with probability 1/2
```

### Constraints

- `1 <= nums.length <= 2 * 10⁴`
- `-2³¹ <= nums[i] <= 2³¹ - 1`
- `target` is an integer from `nums`.
- At most `10⁴` calls will be made to `pick`.

### Follow-up

Suppose the array is enormous and streamed past you once — could you answer
`pick` with only `O(1)` extra memory?

## Hints

### Hint 1

Answering a `pick` by rescanning `nums` collects the matching indices fresh
every call — correct, but it repeats the same walk up to `10⁴` times. The
matches never change, so one pass in the constructor can bucket, for every
value, the list of indices it occupies.

### Hint 2

With those buckets, `pick(target)` is the simplest possible distribution: a
uniform integer over `[0, m)` selecting one stored index. Building costs
`O(n)` once; every call afterwards is `O(1)`.

### Hint 3

For the memory-frugal follow-up, keep one candidate and a counter while
scanning: when you meet the `k`-th occurrence of `target`, replace the
candidate with it with probability exactly `1/k`. By induction every one of
the `m` occurrences is the survivor with probability `1/m` — reservoir
sampling with a reservoir of size one, using no index lists at all.
