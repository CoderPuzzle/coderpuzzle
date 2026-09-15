# Kill Process

## Description

You have `n` processes forming a rooted tree structure. You are given two integer
arrays `pid` and `ppid`, where `pid[i]` is the ID of the `i`th process and
`ppid[i]` is the ID of the `i`th process's parent process.

Each process has only one parent process but may have multiple children
processes. Only one process has `ppid[i] = 0`, which means this process has no
parent process (the root of the tree).

When a process is killed, all of its children processes will also be killed.

Given an integer `kill` representing the ID of a process you want to kill, return
a list of the IDs of the processes that will be killed. The list must be in
breadth-first order starting from the killed process, with each process's
children listed in the order their IDs appear in `pid`.

### Example 1

![diagram](figures/582-1.svg)

```text
Input: pid = [1,3,10,5], ppid = [3,0,5,3], kill = 5
Output: [5,10]
Explanation: Killing process 5 also kills its child process 10.
```

### Example 2

```text
Input: pid = [1], ppid = [0], kill = 1
Output: [1]
```

### Constraints

- `n == pid.length`
- `n == ppid.length`
- `1 <= n <= 5 * 10⁴`
- `1 <= pid[i] <= 5 * 10⁴`
- `0 <= ppid[i] <= 5 * 10⁴`
- Only one process has no parent process.
- All the values of `pid` are unique.
- `kill` is guaranteed to be in `pid`.
