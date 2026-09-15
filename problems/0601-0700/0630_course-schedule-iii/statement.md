# Course Schedule III

## Description

There are `n` different online courses numbered from `1` to `n`. You are given
an array `courses` where `courses[i] = [duration_i, last_day_i]` indicates that
the `i`th course should be taken continuously for `duration_i` days and must be
finished before or on `last_day_i`.

You will start on the 1st day and you cannot take two or more courses
simultaneously.

Return the maximum number of courses that you can take.

### Example 1

```text
Input: courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]
Output: 3
Explanation: There are totally 4 courses, but you can take 3 courses at most:
First, take the 1st course, it costs 100 days so you will finish it on the
100th day, and ready to take the next course on the 101st day.
Second, take the 3rd course, it costs 1000 days so you will finish it on the
1100th day, and ready to take the next course on the 1101st day.
Third, take the 2nd course, it costs 200 days so you will finish it on the
1300th day.
The 4th course cannot be taken now, since you would finish it on the 3300th
day, which exceeds the closed date.
```

### Example 2

```text
Input: courses = [[1,2]]
Output: 1
```

### Example 3

```text
Input: courses = [[3,2],[4,3]]
Output: 0
Explanation: The first course must be finished by day 2 but lasts 3 days, and
the second must be finished by day 3 but lasts 4 days, so no course can be
taken.
```

### Constraints

- `1 <= courses.length <= 10⁴`
- `1 <= duration_i, last_day_i <= 10⁴`

## Hints

### Hint 1

Process the courses in order of increasing deadline. If a set of courses can
all be taken at all, taking them sorted by deadline is always a feasible
schedule, so deciding course by course in that order never misses an optimum.

### Hint 2

Keep the courses taken so far in a max-heap keyed by duration, together with
the total time they occupy. When the next course fits before its deadline,
take it; when it does not, compare it with the longest course already taken.

### Hint 3

If the longest course already taken is longer than the current one, swap them:
the total time shrinks (or stays equal) and the count stays the same, so every
course already taken still finishes before its deadline and the schedule stays
feasible.
