# Find Candidates for Data Scientist Position II

## Description

Table: `Candidates`

| Column Name  | Type    |
| ------------ | ------- |
| candidate_id | int     |
| skill        | varchar |
| proficiency  | int     |

(`candidate_id`, `skill`) is the unique key for this table.
Each row includes `candidate_id`, `skill`, and proficiency level (1-5).

Table: `Projects`

| Column Name | Type    |
| ----------- | ------- |
| project_id  | int     |
| skill       | varchar |
| importance  | int     |

(`project_id`, `skill`) is the primary key for this table.
Each row includes `project_id`, required skill, and its importance
(1-5) for the project.

Leetcode is staffing for multiple data science projects. Write a
solution to find the best candidate for each project based on the
following criteria:

- Candidates must have all the skills required for a project.
- Calculate a score for each candidate-project pair as follows:
    - Start with 100 points
    - Add 10 points for each skill where `proficiency > importance`
    - Subtract 5 points for each skill where `proficiency < importance`
    - If the candidate's skill proficiency equal to the project's skill
      importance, the score remains unchanged

Include only the top candidate (highest score) for each project. If
there’s a tie, choose the candidate with the lower `candidate_id`. If
there is no suitable candidate for a project, do not return that
project.

Return a result table ordered by `project_id` in ascending order.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Candidates` rows and then its `Projects` rows before your
query runs. The result format is in the following example.

### Example 1

```text
Input: Candidates and Projects tables from the dataset below.
Output:
project_id  candidate_id  score
501         101           105
502         102           130
Explanation: For Project 501, Candidate 101 has the highest score of
105. All other candidates have the same score but Candidate 101 has
the lowest candidate_id among them. For Project 502, Candidate 102
has the highest score of 130. The output table is ordered by
project_id in ascending order.
```

Write your solution as a single `SELECT` query returning three columns
— `project_id`, `candidate_id`, and `score` — one row per project that
has at least one qualifying candidate.
