# Generate Schedule

## Description

You are given an integer `n` representing `n` teams labeled `0` to `n - 1`.
Compose a schedule of matches such that:

- Every pair of distinct teams meets exactly twice: once with the first team
  at home and once away.
- Exactly one match is played per day; the schedule is a list of consecutive
  days, and `schedule[i]` is the match played on day `i`.
- No team plays on two consecutive days.

Return the schedule as a 2D integer array `schedule`, where `schedule[i][0]`
is the home team and `schedule[i][1]` is the away team of the match on day
`i`. If no schedule satisfies the conditions, return an empty array.

The original problem accepts any valid schedule; this judge compares arrays
exactly, so the output is pinned to one canonical construction. If `n <= 4`,
no valid schedule exists: return `[]`. If `n == 5`, return the fixed
twenty-match schedule `[0,1],[2,3],[0,4],[1,2],[3,4],[0,2],[1,3],[2,4],
[0,3],[1,4],[2,0],[3,1],[4,0],[2,1],[4,3],[1,0],[3,2],[4,1],[3,0],[4,2]`.

For `n >= 6`, build rounds with the circle method and emit them day by day.
When `n` is even, place teams `0` through `n - 2` on a circle, keep team
`n - 1` fixed, and form round `r` for each `r = 0, 1, ..., n - 2`: first the
match `[n - 1, r]`, then the matches `[(r + k) mod (n - 1), (r - k) mod
(n - 1)]` for `k = 1, ..., (n - 2) / 2`. When `n` is odd, place all teams
`0` through `n - 1` on a circle and form round `r` for each
`r = 0, 1, ..., n - 1`: just the matches `[(r + k) mod n, (r - k) mod n]`
for `k = 1, ..., (n - 1) / 2`. Emit the first half by walking the rounds in
order: open each round with its first listed match that shares no team with
the previously emitted match — in the very first round, simply open with
the first listed match — then emit that round's remaining matches in
listing order. The second half replays the same rounds with every match's
home and away sides swapped, continuing the same rule from the last match
of the first half. Within a round no two matches share a team, and for
`n >= 6` every round lists at least three matches while at most two can
touch the previous match, so the opening scan always finds a safe match.

### Example 1

```text
Input: n = 3
Output: []
Explanation: Six matches are needed: [0,1],[0,2],[1,2],[1,0],[2,0],[2,1].
Each of the three teams would have to play on four of the six days, but six
consecutive days give any team at most three non-adjacent slots, so some
team must play on consecutive days.
```

### Example 2

```text
Input: n = 5
Output: [[0,1],[2,3],[0,4],[1,2],[3,4],[0,2],[1,3],[2,4],[0,3],[1,4],
[2,0],[3,1],[4,0],[2,1],[4,3],[1,0],[3,2],[4,1],[3,0],[4,2]]
Explanation: Twenty matches are needed in total. This is exactly the pinned
five-team schedule above; no team plays on consecutive days.
```

### Constraints

- `2 <= n <= 50`

## Hints

### Hint 1

The original task can be attacked greedily or with randomization; the pinned
construction above is one fully deterministic route.

### Hint 2

When pairing teams directly, ensure neither team played on the previous day.

### Hint 3

Keep track of how many games each team still has to play.

### Hint 4

Among teams that did not play the previous day, a greedy pairing takes the
pair whose combined remaining games is highest.

### Hint 5

If a greedy choice leads to a dead end, try a different match order.
