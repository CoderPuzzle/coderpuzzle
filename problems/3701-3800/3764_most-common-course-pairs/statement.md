# Most Common Course Pairs

## Description

You are given an array `completions` of course-completion records, one row
per finished course. Each row is
`[student, course, date, rating]`: the student's name, the course's name,
the completion date formatted as `YYYY-MM-DD`, and the rating the student
gave the course, an integer from 1 to 5 supplied as a string. The rows
arrive in no particular order.

A student is a _top performer_ when they completed at least 5 courses and
the average of their ratings is at least 4. Both bars are judged exactly:
`4 + 4 + 3 + 3 + 5` averages 3.8 and fails, while `4 + 4 + 4 + 4 + 4`
averages exactly 4 and passes. For every top performer, order their
completed courses chronologically by date; when two completions share a
date, break the tie by course name in ascending (lexicographic) order —
dates sort chronologically because the `YYYY-MM-DD` format orders as
plain strings do.

Each top performer then contributes one count for every _consecutive_
pair of courses in that ordering: if their sequence runs A, B, C, they
add one to pair `(A, B)` and one to pair `(B, C)`. Only adjacent steps
count — revisiting a course later creates no extra pairs.

Return `[firstCourse, secondCourse, count]` for the most common
consecutive pair: the pair `(firstCourse, secondCourse)` with the largest
count. Ties are broken by `firstCourse` in ascending lexicographic order,
then by `secondCourse` in ascending lexicographic order, so the answer is
always unique. `count` is returned as a string. If no student qualifies,
no pair exists and the result is the empty array.

### Example 1

```text
Input: completions =
[["u1","python","2024-01-05","5"],["u1","sql","2024-02-10","4"],
["u1","javascript","2024-03-15","5"],["u1","react","2024-04-20","4"],
["u1","nodejs","2024-05-25","5"],["u1","docker","2024-06-30","4"],
["u2","python","2024-01-08","4"],["u2","react","2024-02-14","5"],
["u2","nodejs","2024-03-20","4"],["u2","docker","2024-04-25","5"],
["u2","aws","2024-05-30","4"],
["u3","python","2024-01-10","3"],["u3","sql","2024-02-12","3"],
["u3","javascript","2024-03-18","3"],["u3","react","2024-04-22","2"],
["u3","nodejs","2024-05-28","3"],
["u4","python","2024-01-12","5"],["u4","datasci","2024-02-16","5"],
["u4","ml","2024-03-22","5"]]
Output: ["nodejs","docker","2"]
Explanation: u1 completed 6 courses averaging 4.5 and u2 completed 5
averaging 4.4 — both qualify. u3 averaged 2.8 and u4 took only 3 courses,
so neither counts. Chronologically, u1 ran python → sql → javascript →
react → nodejs → docker and u2 ran python → react → nodejs → docker → aws.
The pair (nodejs, docker) appears twice, once per student; no other pair
exceeds 1.
```

### Example 2

```text
Input: completions =
[["solo","a","2024-01-01","5"],["solo","b","2024-01-02","5"],
["solo","c","2024-01-03","5"],["solo","d","2024-01-04","5"]]
Output: []
Explanation: The only student finished 4 courses — under the 5-course
floor — so nobody qualifies and there is no pair to report.
```

### Constraints

- `1 <= completions.length <= 10^4`
- `completions[i].length == 4`
- `student` and `course` consist of lowercase English letters and have
  length at most 10.
- `date` is a valid calendar date between `2000-01-01` and `2099-12-31`.
- `1 <= int(rating) <= 5`

## Hints

### Hint 1

Group the rows by student first; each student can be judged — and their
courses sorted — independently.

### Hint 2

Qualification needs no floating point: compare the rating sum against
`4 *` the course count, or use exact rational arithmetic.

### Hint 3

Count consecutive pairs in a hash map keyed by the pair itself, then pick
the winner by comparing `(-count, firstCourse, secondCourse)`.
