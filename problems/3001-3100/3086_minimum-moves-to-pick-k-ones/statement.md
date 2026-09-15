# Minimum Moves to Pick K Ones

## Description

You are given a binary array `nums` of length `n`, a positive integer `k` and a
non-negative integer `maxChanges`.

Alice plays a game, where the goal is for Alice to pick up `k` ones from `nums`
using the minimum number of moves. When the game starts, Alice picks up any
index `aliceIndex` in the range `[0, n - 1]` and stands there. If
`nums[aliceIndex] == 1`, Alice picks up the one and `nums[aliceIndex]` becomes
`0` (this does not count as a move). After this, Alice can make any number of
moves (including zero) where in each move Alice must perform exactly one of the
following actions:

- Select any index `j != aliceIndex` such that `nums[j] == 0` and set
  `nums[j] = 1`. This action can be performed at most `maxChanges` times.
- Select any two adjacent indices `x` and `y` (`|x - y| == 1`) such that
  `nums[x] == 1`, `nums[y] == 0`, then swap their values (set `nums[y] = 1` and
  `nums[x] = 0`). If `y == aliceIndex`, Alice picks up the one after this move
  and `nums[y]` becomes `0`.

Return the minimum number of moves required by Alice to pick exactly `k` ones.

### Example 1

```text
Input: nums = [1,1,0,0,0,1,1,0,0,1], k = 3, maxChanges = 1
Output: 3
Explanation: Alice can pick up 3 ones in 3 moves, if Alice performs the following actions in each move when standing at aliceIndex == 1:
At the start of the game Alice picks up the one and nums[1] becomes 0. nums becomes [1,0,0,0,0,1,1,0,0,1].
Select j == 2 and perform an action of the first type. nums becomes [1,0,1,0,0,1,1,0,0,1].
Select x == 2 and y == 1, and perform an action of the second type. nums becomes [1,1,0,0,0,1,1,0,0,1]. As y == aliceIndex, Alice picks up the one and nums becomes [1,0,0,0,0,1,1,0,0,1].
Select x == 0 and y == 1, and perform an action of the second type. nums becomes [0,1,0,0,0,1,1,0,0,1]. As y == aliceIndex, Alice picks up the one and nums becomes [0,0,0,0,0,1,1,0,0,1].
```

### Example 2

```text
Input: nums = [0,0,0,0], k = 2, maxChanges = 3
Output: 4
Explanation: Alice can pick up 2 ones in 4 moves, if Alice performs the following actions in each move when standing at aliceIndex == 0:
Select j == 1 and perform an action of the first type. nums becomes [0,1,0,0].
Select x == 1 and y == 0, and perform an action of the second type. nums becomes [1,0,0,0]. As y == aliceIndex, Alice picks up the one and nums becomes [0,0,0,0].
Select j == 1 again and perform an action of the first type. nums becomes [0,1,0,0].
Select x == 1 and y == 0 again, and perform an action of the second type. nums becomes [1,0,0,0]. As y == aliceIndex, Alice picks up the one and nums becomes [0,0,0,0].
```

### Constraints

- `2 <= n <= 10⁵`
- `0 <= nums[i] <= 1`
- `1 <= k <= 10⁵`
- `0 <= maxChanges <= 10⁵`
- `maxChanges + sum(nums) >= k`

## Hints

### Hint 1

Ones created using a change require 2 moves. Hence except for the immediate neighbors of the index where we move all the ones, we should try to use change operations.

### Hint 2

For some subset of ones, it is always better to move the ones to the median position.

### Hint 3

We only need to be concerned with the indices where nums[i] == 1.
