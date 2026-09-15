# Maximum Number of Events That Can Be Attended II

## Description

You are given an array of `events` where `events[i] = [startDayi, endDayi, valuei]`.
The `ith` event starts at `startDayi` and ends at `endDayi`, and if you attend
this event, you will receive a value of `valuei`. You are also given an integer
`k` which represents the maximum number of events you can attend.

You can only attend one event at a time. If you choose to attend an event, you
must attend the entire event. Note that the end day is inclusive: that is, you
cannot attend two events where one of them starts and the other ends on the
same day.

Return the maximum sum of values that you can receive by attending events.

### Example 1

```text
Input: events = [[1,2,4],[3,4,3],[2,3,1]], k = 2
Output: 7
Explanation: Choose the green events, 0 and 1 (0-indexed) for a total value
of 4 + 3 = 7.
```

![Example 1 events](figures/example-1.svg)

### Example 2

```text
Input: events = [[1,2,4],[3,4,3],[2,3,10]], k = 2
Output: 10
Explanation: Choose event 2 for a total value of 10.
Notice that you cannot attend any other event as they overlap, and that you do
not have to attend k events.
```

![Example 2 events](figures/example-2.svg)

### Example 3

```text
Input: events = [[1,1,1],[2,2,2],[3,3,3],[4,4,4]], k = 3
Output: 9
Explanation: Although the events do not overlap, you can only attend 3 events.
Pick the highest valued three.
```

![Example 3 events](figures/example-3.svg)

### Constraints

- `1 <= k <= events.length`
- `1 <= k * events.length <= 10⁶`
- `events[i].length == 3`
- `1 <= startDayi <= endDayi <= 10⁹`
- `1 <= valuei <= 10⁶`

## Hints

### Hint 1

Sort the events by end day. Then the events you attend always appear in this
order, and each attended event only needs to be compatible with the previously
attended one.

### Hint 2

Let `dp[i][j]` be the maximum total value achievable using only the first `i`
sorted events while attending at most `j` of them. Relate it to `dp[i-1][j]`
(skip event `i`) and to taking event `i` on top of a compatible prefix.

### Hint 3

When taking event `i`, the events compatible with it form a prefix of the
sorted order — those ending strictly before its start day. Binary search the
sorted end days to find that prefix.
