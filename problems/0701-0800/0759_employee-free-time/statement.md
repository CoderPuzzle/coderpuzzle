# Employee Free Time

## Description

We are given a list `schedule` of employees, which represents the working
time for each employee.

Each employee has a list of non-overlapping intervals, and these intervals
are in sorted order.

Return the list of finite intervals representing **common, positive-length
free time** for all employees, also in sorted order.

We would not include intervals like `[5, 5]` in our answer, as they have zero
length. Intervals touching at an endpoint — one ending exactly where the next
begins — are continuous: `[1, 3]` and `[3, 5]` together leave no free time at
`3`.

### Example 1

```text
Input: schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
Output: [[3,4]]
Explanation: There are a total of three employees, and all common
free time intervals would be [-inf, 1], [3, 4], [10, inf].
We discard any intervals that contain inf as they aren't finite.
```

### Example 2

```text
Input: schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]
Output: [[5,6],[7,9]]
Explanation: The merged busy time is [1, 5] and [6, 7] and [9, 12]; the
finite gaps between those blocks are [5, 6] and [7, 9].
```

### Constraints

- `1 <= schedule.length, schedule[i].length <= 50`
- `0 <= schedule[i][j][0] < schedule[i][j][1] <= 10⁸`
- The intervals within one employee's list are pairwise non-overlapping and
  sorted by start.

## Hints

### Hint 1

A moment is free only when **no** employee is working — so the shape that
matters is the union of everyone's intervals, and the answer is the finite
gaps between its blocks. Which employee an interval came from is irrelevant
once the lists are pooled.

### Hint 2

Pool all intervals and sort by start. Sweeping left to right while carrying
the furthest end seen so far (`prev_end`) merges overlapping blocks on the
fly: an interval starting beyond `prev_end` proves a gap
`[prev_end, start]`.

### Hint 3

Two details finish it: `prev_end` must be a running **maximum** (a long
interval keeps absorbing later short ones), and a gap is emitted only when
`start > prev_end` — strictly — because touching intervals continue the same
busy block. The infinite gaps before the first and after the last interval
never appear: they open or close at the array's ends.

### Follow-up

Each employee's list is already sorted — a k-way merge (for example with a
min-heap over the lists' heads) pools them in sorted order without sorting
pooled intervals. When is that worth the extra structure?
