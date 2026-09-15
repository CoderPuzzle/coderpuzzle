# Earliest Time to Finish One Task

## Description

You are given a 2D integer array `tasks` where `tasks[i] = [si, ti]`. Each
pair describes one task: it starts at time `si` and takes `ti` units of time
to finish. The tasks run independently — none of them waits for another or
competes for a shared machine — so the task `[si, ti]` is finished at moment
`si + ti`.

Return the earliest time at which at least one task is finished.

### Example 1

```text
Input: tasks = [[1,6],[2,3]]
Output: 5
Explanation: The pair [2,3] finishes at 2 + 3 = 5. The pair [1,6] does not
finish until 1 + 6 = 7, so the earliest finish is 5.
```

### Example 2

```text
Input: tasks = [[100,100],[100,100],[100,100]]
Output: 200
Explanation: All three pairs finish at 100 + 100 = 200.
```

### Constraints

- `1 <= tasks.length <= 100`
- `tasks[i] = [si, ti]`
- `1 <= si, ti <= 100`

## Hints

### Hint 1

Compute finish[i] = s[i] + t[i] for each task and take the minimum.
