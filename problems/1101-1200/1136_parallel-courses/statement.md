# Parallel Courses

## Description

You are given an integer `n`, which indicates that there are `n` courses labeled
from `1` to `n`. You are also given an array `relations` where
`relations[i] = [prevCourse_i, nextCourse_i]`, representing a prerequisite
relationship between course `prevCourse_i` and course `nextCourse_i`: course
`prevCourse_i` has to be taken before course `nextCourse_i`.

In one semester, you can take any number of courses as long as you have taken
all the prerequisites in the previous semester for the courses you are taking.

Return the minimum number of semesters needed to take all courses. If there is
no way to take all the courses, return `-1`.

### Example 1

```text
Input: n = 3, relations = [[1,3],[2,3]]
Output: 2
Explanation: The figure above represents the given graph.
In the first semester, you can take courses 1 and 2.
In the second semester, you can take course 3.
```

![Courses 1 and 2 in a semester-1 band, both arrows pointing to course 3 in a semester-2 band.](figures/example-1.svg)

### Example 2

```text
Input: n = 3, relations = [[1,2],[2,3],[3,1]]
Output: -1
Explanation: No course can be studied because they are prerequisites of each other.
```

![Three courses wired as a directed cycle 1 to 2 to 3 back to 1.](figures/example-2.svg)

### Constraints

- `1 <= n <= 5000`
- `1 <= relations.length <= 5000`
- `relations[i].length == 2`
- `1 <= prevCourse_i, nextCourse_i <= n`
- `prevCourse_i != nextCourse_i`
- All the pairs `[prevCourse_i, nextCourse_i]` are unique.

## Hints

### Hint 1

Think of it as a graph problem: it is impossible to study all the courses if the graph has a cycle.

### Hint 2

Once acyclic, the answer equals the longest path in the DAG.

### Hint 3

You can find the longest path with a layered topological sort (Kahn's algorithm) or DP over the DAG.
