# Parallel Courses II

## Description

You are given an integer `n`, which indicates that there are `n` courses labeled
from `1` to `n`. You are also given an array `relations` where
`relations[i] = [prevCourse_i, nextCourse_i]`, representing a prerequisite
relationship between course `prevCourse_i` and course `nextCourse_i`: course
`prevCourse_i` has to be taken before course `nextCourse_i`. You are also given
an integer `k`.

In one semester, you can take **at most** `k` courses as long as you have taken
all the prerequisites in the previous semesters for the courses you are taking.

Return the minimum number of semesters needed to take all courses. The testcases
are generated such that it is possible to take every course.

### Example 1

```text
Input: n = 4, relations = [[2,1],[3,1],[1,4]], k = 2
Output: 3
Explanation: In the first semester, you can take courses 2 and 3.
In the second semester, you can take course 1.
In the third semester, you can take course 4.
```

![Courses 2 and 3 in semester 1, course 1 in semester 2 and course 4 in semester 3, at most two per semester.](figures/example-1.svg)

### Example 2

```text
Input: n = 5, relations = [[2,1],[3,1],[4,1],[1,5]], k = 2
Output: 4
Explanation: In the first semester, you can only take courses 2 and 3 since you cannot take more than two per semester.
In the second semester, you can take course 4.
In the third semester, you can take course 1.
In the fourth semester, you can take course 5.
```

![The four semesters: 2 and 3 together, then 4, then 1, then 5 — the k = 2 limit forces four semesters.](figures/example-2.svg)

### Constraints

- `1 <= n <= 15`
- `1 <= k <= n`
- `0 <= relations.length <= n * (n - 1) / 2`
- `relations[i].length == 2`
- `1 <= prevCourse_i, nextCourse_i <= n`
- `prevCourse_i != nextCourse_i`
- All the pairs `[prevCourse_i, nextCourse_i]` are unique.
- The given graph is a directed acyclic graph.

## Hints

### Hint 1

With `n <= 15`, the set of courses taken so far fits in a 15-bit mask — let `dp[mask]` be the minimum number of semesters needed to have taken exactly the courses in `mask`.

### Hint 2

From a state, the courses you may start are exactly those whose full prerequisite set is contained in `mask`; precompute a prerequisite bitmask per course so this check is a single AND.

### Hint 3

Taking an extra available course early never hurts a later semester, so an optimal schedule takes exactly `min(k, number of available)` courses every semester — transitions only need subsets of that exact size.
