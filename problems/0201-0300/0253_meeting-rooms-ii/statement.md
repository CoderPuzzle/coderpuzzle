# Meeting Rooms II

## Description

Given an array of meeting time intervals `intervals` where
`intervals[i] = [start_i, end_i]`, return the minimum number of conference
rooms required.

### Example 1

```text
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2
```

### Example 2

```text
Input: intervals = [[7,10],[2,4]]
Output: 1
```

### Constraints

- `1 <= intervals.length <= 10^4`
- `0 <= start_i < end_i <= 10^6`

## Hints

### Hint 1

Sort the meetings by start time; each meeting either reuses a room that has been vacated or needs a brand-new one.

### Hint 2

You do not need to know which room frees up, only the earliest end time among the rooms in use — keep the end times in a min-heap.

### Hint 3

If the smallest end time in the heap is still greater than the current meeting's start, no room is free, so allocate a new one; otherwise replace the top of the heap with the new end time.

### Hint 4

The answer is the heap size after processing every meeting.
