# Count of Unfinished Tasks After Each Shift

## Description

You are given two integer arrays `tasks` and `shifts`.

- `tasks[i]` represents the time required to complete the `i`th task.
- `shifts[j]` represents the amount of time available during the `j`th shift.

The tasks must be processed in order from left to right.

- Carry-over: If a task is not completed during a shift, processing continues from the same point in that task during the next shift.
- Restart: If all tasks are completed during a shift, the shift ends immediately. Any unused time in that shift is discarded, and the next shift begins again from task 0.

A task is unfinished if it has not been fully completed. This includes a task
that is currently in progress.

Return an integer array `ans` where `ans[j]` is the number of unfinished tasks
immediately after the `j`th shift.

### Example 1

```text
Input: tasks = [1,4,4], shifts = [9,1,4]
Output: [0,2,1]
Explanation:
- Shift 0: The tasks require 1 + 4 + 4 = 9 units of time, so all tasks are completed. There are 0 unfinished tasks.
- Shift 1: Processing restarts from task 0. The shift has time 1, so task 0 is completed. There are 2 unfinished tasks.
- Shift 2: Processing continues from task 1. The shift has time 4, so task 1 is completed. There is 1 unfinished task.
```

### Example 2

```text
Input: tasks = [2,3,4], shifts = [20,4,5]
Output: [0,2,0]
Explanation:
- Shift 0: The tasks require 2 + 3 + 4 = 9 units of time, so all tasks are completed. The remaining time in this shift is ignored. There are 0 unfinished tasks.
- Shift 1: Processing restarts from task 0. The shift has time 4, so task 0 is completed and task 1 is partially completed. There are 2 unfinished tasks.
- Shift 2: Processing continues from task 1. The remaining time needed is 1 + 4 = 5, so all tasks are completed. There are 0 unfinished tasks.
```

### Example 3

```text
Input: tasks = [4,2], shifts = [3,6,1]
Output: [2,0,2]
Explanation:
- Shift 0: The shift has time 3, so task 0 is partially completed with 1 unit of work remaining. There are 2 unfinished tasks.
- Shift 1: Processing continues from task 0. The remaining time needed is 1 + 2 = 3, so all tasks are completed. There are 0 unfinished tasks.
- Shift 2: Processing restarts from task 0. The shift has time 1, so task 0 is partially completed. There are 2 unfinished tasks.
```

### Constraints

- `1 <= tasks.length <= 10⁵`
- `1 <= shifts.length <= 10⁵`
- `1 <= tasks[i] <= 10⁹`
- `1 <= shifts[i] <= 10⁹`

## Hints

### Hint 1

Build prefix sums of tasks, where prefix[i] is the total time needed to complete tasks 0 through i.

### Hint 2

Maintain the amount of work already completed in the current pass through tasks. If adding the current shift length reaches or exceeds the total task time, all tasks are completed, so append 0 and reset the completed work to 0.

### Hint 3

Otherwise, use binary search on the prefix sums to count how many tasks have been fully completed. If this count is c, then tasks.length - c tasks are unfinished.
