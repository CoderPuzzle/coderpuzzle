# Find Minimum Time to Finish All Jobs

## Description

You are given an integer array `jobs`, where `jobs[i]` is the amount of time it takes to complete the `ith` job.

There are `k` workers that you can assign jobs to. Each job should be assigned to exactly one worker. The working time of a worker is the sum of the time it takes to complete all jobs assigned to them. Your goal is to devise an optimal assignment such that the maximum working time of any worker is minimized.

Return the minimum possible maximum working time of any assignment.

### Example 1

```text
Input: jobs = [3,2,3], k = 3
Output: 3
Explanation: By assigning each person one job, the maximum time is 3.
```

### Example 2

```text
Input: jobs = [1,2,4,7,8], k = 2
Output: 11
Explanation: Assign the jobs the following way:
Worker 1: 1, 2, 8 (working time = 1 + 2 + 8 = 11)
Worker 2: 4, 7 (working time = 4 + 7 = 11)
The maximum working time is 11.
```

### Constraints

- `1 <= k <= jobs.length <= 12`
- `1 <= jobs[i] <= 10⁷`

## Hints

### Hint 1

We can select a subset of tasks and assign it to a worker, then solve the subproblem on the remaining tasks.

### Hint 2

Try to find the minimal feasible maximum working time: if a limit is feasible, a larger one is too, so the predicate is monotone and can be binary searched.

### Hint 3

To test a limit, use backtracking that assigns jobs to workers and prunes when a worker's load already reaches the limit.
