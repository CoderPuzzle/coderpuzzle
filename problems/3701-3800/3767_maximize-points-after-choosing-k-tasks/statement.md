# Maximize Points After Choosing K Tasks

## Description

You are given two integer arrays, `technique1` and `technique2`, each of
length `n`, where `n` is the number of tasks to complete.

- Completing the i-th task using technique 1 earns `technique1[i]`
  points.
- Completing the i-th task using technique 2 earns `technique2[i]`
  points.

Every task must be completed exactly once, using one of the two
techniques. You are also given an integer `k`: at least `k` of the tasks
must be completed using technique 1 (they do not need to be the first
`k` tasks). The remaining tasks may use either technique.

Return an integer denoting the maximum total points you can earn.

### Example 1

```text
Input: technique1 = [5,2,10], technique2 = [10,3,8], k = 2
Output: 22
Explanation: At least k = 2 tasks must use technique 1. Taking task 1
for 2 points and task 2 for 10 points with technique 1, then task 0 for
10 points with technique 2, earns 2 + 10 + 10 = 22 — the maximum.
```

### Example 2

```text
Input: technique1 = [10,20,30], technique2 = [5,15,25], k = 2
Output: 60
Explanation: Technique 1 pays more on every task, so completing all
three with technique 1 earns 10 + 20 + 30 = 60, which already satisfies
the requirement of at least two.
```

### Example 3

```text
Input: technique1 = [1,2,3], technique2 = [4,5,6], k = 0
Output: 15
Explanation: With k = 0 nothing forces technique 1, so every task is
taken with technique 2 for 4 + 5 + 6 = 15.
```

### Constraints

- `1 <= n == technique1.length == technique2.length <= 10^5`
- `1 <= technique1[i], technique2[i] <= 10^5`
- `0 <= k <= n`

## Hints

### Hint 1

Start from the assignment that takes technique 1 everywhere; its total
is the sum of `technique1`. It always satisfies the requirement, so it
is a valid starting point no matter what `k` is.

### Hint 2

Switching task `i` from technique 1 to technique 2 changes the total by
`technique2[i] - technique1[i]`. You may perform exactly the switches
whose delta is positive, but never more than `n - k` of them.

### Hint 3

Sort the deltas in descending order and switch greedily while the delta
stays positive and switches remain; a running maximum over the totals
after each prefix of switches is the answer.
