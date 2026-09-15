# The Number of Seniors and Juniors to Join the Company

## Description

Table: `Candidates`

| Column Name | Type |
| ----------- | ---- |
| employee_id | int  |
| experience  | enum |
| salary      | int  |

`employee_id` is the column with unique values for this table. `experience`
is an ENUM (category) type with values (`'Senior'`, `'Junior'`). Each row of
this table indicates the ID of a candidate, their monthly salary, and their
experience.

A company wants to hire new employees. The company's salary budget is $70,000.
The company's criteria for hiring are:

- Hire the largest number of seniors.
- After hiring the maximum number of seniors, use the remaining budget to hire
  the largest number of juniors.

Write a solution to find the number of seniors and juniors hired under these
criteria.

Return the result table in any order.

Each testcase supplies its own `dataset`, whose statements insert all of that
testcase's rows into `Candidates` before your query runs. The result format is
shown in the following examples.

### Example 1

```text
Input:
Candidates table:
employee_id  experience  salary
1            Junior      10000
9            Junior      10000
2            Senior      20000
11           Senior      20000
13           Senior      50000
4            Junior      40000
Output:
experience  accepted_candidates
Senior      2
Junior      2
Explanation: We can hire seniors 2 and 11 for $40,000. The remaining $30,000
cannot cover senior 13, but it can cover juniors 1 and 9 for $20,000; the final
$10,000 cannot cover junior 4.
```

### Example 2

```text
Input:
Candidates table:
employee_id  experience  salary
1            Junior      10000
9            Junior      10000
2            Senior      80000
11           Senior      80000
13           Senior      80000
4            Junior      40000
Output:
experience  accepted_candidates
Senior      0
Junior      3
Explanation: No senior is affordable within the $70,000 budget, so all three
juniors are hired with the remaining budget.
```

Write your solution as a single query returning two columns — `experience` and
`accepted_candidates` — with exactly one row for `Senior` and one row for
`Junior`, including a zero count when no candidate in a category is hired.
