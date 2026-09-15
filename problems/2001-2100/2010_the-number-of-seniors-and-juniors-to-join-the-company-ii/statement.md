# The Number of Seniors and Juniors to Join the Company II

## Description

Table: `Candidates`

| Column Name | Type |
| ----------- | ---- |
| employee_id | int  |
| experience  | enum |
| salary      | int  |

`employee_id` is the column with unique values for this table. `experience`
is an ENUM (category) with values (`'Senior'`, `'Junior'`). Each row of this
table indicates the ID of a candidate, their monthly salary, and their
experience. The salary of each candidate is guaranteed to be unique.

A company wants to hire new employees. The company's salary budget is $70,000.
The company's criteria for hiring are:

- Keep hiring the senior with the smallest salary until no more seniors can be
  hired.
- Use the remaining budget to hire the junior with the smallest salary.
- Keep hiring the junior with the smallest salary until no more juniors can be
  hired.

Write a solution to find the IDs of seniors and juniors hired under these
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
9            Junior      15000
2            Senior      20000
11           Senior      16000
13           Senior      50000
4            Junior      40000
Output:
employee_id
11
2
1
9
Explanation: We can hire seniors 11 and 2 for $36,000. The remaining $34,000
cannot cover senior 13, but it can cover juniors 1 and 9 for $25,000; the final
$9,000 cannot cover junior 4.
```

### Example 2

```text
Input:
Candidates table:
employee_id  experience  salary
1            Junior      25000
9            Junior      10000
2            Senior      85000
11           Senior      80000
13           Senior      90000
4            Junior      30000
Output:
employee_id
9
1
4
Explanation: No senior is affordable within the $70,000 budget, so all three
juniors are hired with the remaining budget.
```

Write your solution as a single query returning the `employee_id` of every
hired candidate.
