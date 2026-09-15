# Course Schedule

## Description

There are a total of `numCourses` courses you have to take, labeled from `0`
to `numCourses - 1`. You are given an array `prerequisites` where
`prerequisites[i] = [a_i, b_i]` indicates that you must take course `b_i`
first if you want to take course `a_i`.

For example, the pair `[0, 1]` indicates that to take course `0` you have to
first take course `1`.

Return `true` if you can finish all courses. Otherwise, return `false`.

### Example 1

```text
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take.
To take course 1 you should have finished course 0. So it is possible.
```

### Example 2

```text
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take.
To take course 1 you should have finished course 0, and to take course 0 you
should also have finished course 1. So it is impossible.
```

### Constraints

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`
- `0 <= a_i, b_i < numCourses`
- All the pairs `prerequisites[i]` are unique.

## Hints

### Hint 1

The problem is equivalent to detecting whether the directed graph built from the prerequisites contains a cycle; if a cycle exists, no topological ordering exists.

### Hint 2

Topological sort via DFS: mark nodes as visiting/visited and detect a back edge to find a cycle.

### Hint 3

Topological sort can also be done via BFS (Kahn's algorithm), repeatedly removing courses whose remaining prerequisites have all been taken.
