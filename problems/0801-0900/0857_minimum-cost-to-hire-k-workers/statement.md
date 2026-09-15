# Minimum Cost to Hire K Workers

## Description

There are `n` workers. You are given two integer arrays `quality` and `wage`
where `quality[i]` is the quality of the `i`th worker and `wage[i]` is the
minimum wage expectation of the `i`th worker.

We want to hire exactly `k` workers to form a paid group. To hire a group of
`k` workers, we must pay them according to the following rules:

- Every worker in the paid group must be paid at least their minimum wage
  expectation.
- In the group, each worker's pay must be directly proportional to their
  quality. This means if a worker's quality is double that of another worker
  in the group, then they must be paid twice as much as the other worker.

Given the integer `k`, return the least amount of money needed to form a paid
group satisfying the above conditions. Answers within `10^-5` of the actual
answer will be accepted.

### Example 1

```text
Input: quality = [10,20,5], wage = [70,50,30], k = 2
Output: 105.00000
Explanation: We pay 70 to the 0th worker and 35 to the 2nd worker.
```

### Example 2

```text
Input: quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3
Output: 30.66667
Explanation: We pay 4 to the 0th worker, 13.33333 to the 2nd and 3rd workers
separately.
```

### Constraints

- `n == quality.length == wage.length`
- `1 <= k <= n <= 10^4`
- `1 <= quality[i], wage[i] <= 10^4`

## Hints

### Hint 1

If the worker with the highest wage/quality ratio r in the group is paid exactly their minimum wage, every member i is paid r * quality[i], which must be at least wage[i].

### Hint 2

Sort workers by ratio; with the current worker as the group's highest ratio, the cost is ratio * (sum of the group's qualities).

### Hint 3

Keep a max-heap of the qualities in the candidate group so the k smallest qualities among the cheaper-ratio workers are always retained.
