# Avoid Flood in The City

## Description

Your country has 10⁹ lakes. Initially, all the lakes are empty, but when
it rains over the `n`-th lake, the `n`-th lake becomes full of water. If
it rains over a lake that is full of water, there will be a flood. Your
goal is to avoid floods in any lake.

Given an integer array `rains`, where:

- `rains[i] > 0` means there will be rain over the lake `rains[i]`.
- `rains[i] == 0` means there is no rain this day, and you must choose one
  lake this day and dry it.

Return an array `ans` where:

- `ans.length == rains.length`
- `ans[i] == -1` if `rains[i] > 0`
- `ans[i]` is the lake you choose to dry on the `i`-th day if
  `rains[i] == 0`

If there are multiple valid answers return any of them. If it is
impossible to avoid flood return an empty array.

Notice that if you choose to dry a full lake, it becomes empty, but if you
choose to dry an empty lake, nothing changes.

Many choices of drying days can avoid the flood — the original judge
accepts any flood-free answer. For a deterministic answer, the expected
output is pinned to this canonical strategy: scan the days left to right;
on a rain day over an already-full lake, answer with the empty array; on a
dry day, if some full lake rains again before any later dry day arrives,
dry that lake today (the earliest such deadline wins), otherwise dry lake
`1`. When no lake is full at all, also dry lake `1`.

### Example 1

```text
Input: rains = [1,2,3,4]
Output: [-1,-1,-1,-1]
Explanation: Every day it rains over a different lake; no drying is ever
needed and no lake floods.
```

### Example 2

```text
Input: rains = [1,2,0,0,2,1]
Output: [-1,-1,2,1,-1,-1]
Explanation: After day two lakes 1 and 2 are full. Lake 2 rains again on
day 5 and lake 1 on day 6, so the two dry days must be spent: day 3 dries
lake 2 and day 4 dries lake 1. [-1,-1,1,2,-1,-1] is another acceptable
answer; the canonical strategy produces exactly the output shown.
```

### Example 3

```text
Input: rains = [1,2,0,1,2]
Output: []
Explanation: After day two, lakes 1 and 2 are full but only one dry day
(day 3) remains before both rain again. Whichever lake we dry, the other
floods, so no valid answer exists.
```

### Constraints

- `1 <= rains.length <= 10⁵`
- `0 <= rains[i] <= 10⁹`

## Hints

### Hint 1

Track the last day it rained over each lake.

### Hint 2

Keep the positions of dry days you can still spend.

### Hint 3

When it rains over a full lake, spend the first available dry day after
that lake's previous rain and assign it to this lake.
