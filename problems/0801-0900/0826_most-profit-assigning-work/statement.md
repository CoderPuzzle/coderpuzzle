# Most Profit Assigning Work

## Description

There are `n` jobs and `m` workers, described by three integer arrays
`difficulty`, `profit`, and `worker`. Job `i` has difficulty `difficulty[i]`
and pays `profit[i]`, while `worker[j]` is the ability of worker `j`: that
worker can complete a job only if its difficulty is at most `worker[j]`.

Each worker is assigned at most one job, but a job is never used up — the
same job may be completed by any number of workers, each collecting its
profit. For instance, if three workers all take a job that pays `1`, the
total profit is `3`. A worker who can complete no job contributes `0`.

Assign the workers so that the total profit is as large as possible and
return that maximum total profit.

### Example 1

```text
Input: difficulty = [2,4,6,8,10], profit = [10,20,30,40,50], worker = [4,5,6,7]
Output: 100
Explanation: The workers are assigned jobs of difficulty [4,4,6,6] and earn
[20,20,30,30] respectively, for a total of 100.
```

### Example 2

```text
Input: difficulty = [85,47,57], profit = [24,66,99], worker = [40,25,25]
Output: 0
Explanation: No worker can complete the easiest job (difficulty 47), so every
worker earns 0.
```

### Constraints

- `n == difficulty.length`
- `n == profit.length`
- `m == worker.length`
- `1 <= n, m <= 10⁴`
- `1 <= difficulty[i], profit[i], worker[i] <= 10⁵`
