# Design Task Manager

## Description

There is a task management system that allows users to manage their tasks,
each associated with a priority. The system should efficiently handle adding,
modifying, executing, and removing tasks.

Implement the `TaskManager` class:

- `TaskManager(int[][] tasks)` Initializes the task manager with a list of
  user-task-priority triples. Each element of the list is of the form
  `[userId, taskId, priority]`, which adds a task with the given `taskId` and
  `priority` to the user with id `userId`.
- `void add(int userId, int taskId, int priority)` Adds a task with the
  specified `taskId` and `priority` to the user with `userId`. It is
  guaranteed that `taskId` does not exist in the system.
- `void edit(int taskId, int newPriority)` Updates the priority of the
  existing `taskId` to `newPriority`. It is guaranteed that `taskId` exists
  in the system.
- `void rmv(int taskId)` Removes the task identified by `taskId` from the
  system. It is guaranteed that `taskId` exists in the system.
- `int execTop()` Executes the task with the highest priority across all
  users. If there are multiple tasks with the same highest priority, execute
  the one with the highest `taskId`. After executing, the `taskId` is removed
  from the system. Return the `userId` associated with the executed task. If
  no tasks are available, return `-1`.

A user may be assigned multiple tasks.

### Example 1

```text
Input:
["TaskManager", "add", "edit", "execTop", "rmv", "add", "execTop"]
[[[[1, 101, 10], [2, 102, 20], [3, 103, 15]]], [4, 104, 5], [102, 8], [], [101], [5, 105, 15], []]
Output: [null, null, null, 3, null, null, 5]
Explanation:
TaskManager taskManager = new TaskManager([[1, 101, 10], [2, 102, 20], [3, 103, 15]]);
taskManager.add(4, 104, 5);  // adds task 104 with priority 5 for user 4.
taskManager.edit(102, 8);    // updates the priority of task 102 to 8.
taskManager.execTop();       // return 3 — executes task 103 of user 3.
taskManager.rmv(101);        // removes task 101 from the system.
taskManager.add(5, 105, 15); // adds task 105 with priority 15 for user 5.
taskManager.execTop();       // return 5 — executes task 105 of user 5.
```

### Constraints

- `1 <= tasks.length <= 10⁵`
- `0 <= userId <= 10⁵`
- `0 <= taskId <= 10⁵`
- `0 <= priority, newPriority <= 10⁹`
- At most `2 * 10⁵` calls in total will be made to `add`, `edit`, `rmv`, and
  `execTop`.
- The input is generated such that `taskId` will be valid across all calls.

### Follow-up

`edit` and `rmv` each invalidate exactly one heap entry — can you keep the
priority queue correct without ever deleting from it?

## Hints

### Hint 1

The ranking key is the pair `(priority, taskId)` ordered descending on both
components, so a max-heap ordered by that pair answers `execTop` — provided
the top still refers to a live task with a matching priority.

### Hint 2

Keep a hash map from `taskId` to its current `(priority, userId)`. `edit`
rewrites the map and pushes a fresh heap entry; `rmv` just erases the map
entry. Neither ever touches the heap.

### Hint 3

`execTop` pops while the top's task is missing from the map or carries a
different priority than the map records — those entries are garbage from past
`edit`/`rmv`/`execTop` calls. The first entry that survives the check is the
true maximum; remove its task from the map and return its user.
