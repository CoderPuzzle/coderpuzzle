# Maximum Number of Groups Entering a Competition

## Description

You are given an integer array grades representing the grades of students in
a university. You want to enter all of the students into a competition in
ordered non-empty groups such that the ordering satisfies both of the
following conditions:

- The sum of the grades of the students in the i-th group is strictly less
  than the sum of the grades of the students in the (i + 1)-th group, for
  all groups except the last.
- The total number of students in the i-th group is strictly less than the
  total number of students in the (i + 1)-th group, for all groups except
  the last.

Return the maximum number of groups that can be formed.

### Example 1

```text
Input: grades = [10,6,12,7,3,5]
Output: 3
Explanation: The following is one way to form 3 groups of students:
- The 1st group has the student with grade = [12]. Grade sum: 12. Student
  count: 1.
- The 2nd group has the students with grades = [6,7]. Grade sum:
  6 + 7 = 13. Student count: 2.
- The 3rd group has the students with grades = [10,3,5]. Grade sum:
  10 + 3 + 5 = 18. Student count: 3.
It can be shown that it is not possible to form more than 3 groups.
```

### Example 2

```text
Input: grades = [8,8]
Output: 1
Explanation: We can only form 1 group, since forming 2 groups would lead
to an equal number of students in both groups.
```

### Constraints

- `1 <= grades.length <= 10⁵`
- `1 <= grades[i] <= 10⁵`

## Hints

### Hint 1

Would it be easier to place the students into valid groups after sorting
them by their grades in ascending order?

### Hint 2

Notice that, after sorting, we can separate them into groups of sizes
1, 2, 3, and so on.

### Hint 3

If the last group is invalid, we can merge it with the previous group.

### Hint 4

This creates the maximum number of groups because we always greedily form
the smallest possible group.
