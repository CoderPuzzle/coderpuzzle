# Random Pick with Blacklist

## Description

You are given an integer `n` and an array of unique integers `blacklist`.
Design an algorithm to pick a random integer in the range `[0, n - 1]` that
is **not** in `blacklist`. Any integer that is in the mentioned range and
not in `blacklist` should be equally likely to be returned.

Optimize your algorithm such that it minimizes the number of calls to the
built-in random function of your language.

Implement the `Solution` class:

- `Solution(int n, int[] blacklist)` Initializes the object with the integer
  `n` and the array `blacklist`.
- `int pick()` Returns a random integer in the range `[0, n - 1]` and not in
  `blacklist`.

### Statistical judging

`pick` samples **uniformly over the allowed values**, exactly as on
LeetCode — the judge verifies this statistically rather than comparing a
single draw. Each judged `pick` is invoked thousands of times (up to
~300000 draws), every returned value must be outside `blacklist` (and
inside `[0, n - 1]`), and the empirical frequency of each allowed value
must fall within a tolerance band of its probability `1 / (n - b)`, where
`b` is the blacklist size.

Gathering that much evidence per value bounds the statistically judged
cases to `n - b <= ~200` allowed values with `n` up to ~2 * 10⁴ (the
constraints allow `n` up to 10⁹ and `b` up to 10⁵, far beyond any enumerable
frequency table; the remap construction below is `O(b)`, independent of
`n`'s magnitude).

### Example 1

```text
Input:
["Solution", "pick", "pick", "pick", "pick", "pick", "pick", "pick"]
[[7, [2, 3, 5]], [], [], [], [], [], [], []]
Output: [null, 0, 4, 1, 6, 1, 0, 4]
Explanation:
Solution solution = new Solution(7, [2, 3, 5]);
solution.pick(); // return 0, any integer from [0, 1, 4, 6] should be ok.
                 // Note that for every call of pick, 0, 1, 4, and 6 must be
                 // equally likely to be returned (i.e. with probability 1/4).
solution.pick(); // return 4
solution.pick(); // return 1
solution.pick(); // return 6
solution.pick(); // return 1
solution.pick(); // return 0
solution.pick(); // return 4
```

### Example 2

```text
Input:
["Solution", "pick", "pick"]
[[1, []], [], []]
Output: [null, 0, 0]
Explanation:
Solution solution = new Solution(1, []);
solution.pick(); // return 0 — with no blacklist, [0, 0] is the whole range
solution.pick(); // return 0
```

### Constraints

- `1 <= n <= 10⁹`
- `0 <= blacklist.length <= min(10⁵, n - 1)`
- `0 <= blacklist[i] < n`
- All the values of `blacklist` are unique.
- At most `2 * 10⁴` calls will be made to `pick`.

## Hints

### Hint 1

Rejection sampling — draw uniformly from `[0, n)` and retry on a blacklisted
hit — is correct but unbounded: with `b` close to `n` it wastes enormous
numbers of random calls. The allowed values number exactly `n - b`, so aim
a uniform draw at a **compressed** range `[0, n - b)` instead.

### Hint 2

The compression has one catch: some values in `[0, n - b)` may themselves
be blacklisted. Pair each such value with a free value from the upper part
`[n - b, n)` — free values exist in sufficient number because the upper
part contains `b` values of which at most `b` are blacklisted. Store the
pairing in a hash map built once.

### Hint 3

`pick()` is then a single random call over `[0, n - b)` plus one hash
lookup (identity when the draw is not a remapped key) — one built-in
random call per pick, which is what the optimization requirement asks for.
The construction cost is `O(b)`, never `O(n)`.
