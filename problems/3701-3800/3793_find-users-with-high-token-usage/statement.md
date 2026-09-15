# Find Users with High Token Usage

## Description

Table: `Prompts`

| Column Name | Type    |
| ----------- | ------- |
| user_id     | int     |
| prompt      | varchar |
| tokens      | int     |

(`user_id`, `prompt`) is the primary key (unique value) for this table.
Each row represents a prompt submitted by a user to an AI system along
with the number of tokens consumed.

Write a solution to analyze AI prompt usage patterns based on the
following requirements:

- For each user, calculate the total number of prompts they have
  submitted.
- For each user, calculate the average tokens used per prompt (Rounded to
  2 decimal places).
- Only include users who have submitted at least 3 prompts.
- Only include users who have submitted at least one prompt with tokens
  greater than their own average token usage.

Return the result table ordered by average tokens in descending order,
and then by `user_id` in ascending order.

Each testcase's `dataset` seeds the `Prompts` table: its script inserts
the testcase's `Prompts` rows before your query runs. The result format
is in the following example.

### Example 1

```text
Input:
Prompts table:
+---------+--------------------------+--------+
| user_id | prompt                   | tokens |
+---------+--------------------------+--------+
| 1       | Write a blog outline     | 120    |
| 1       | Generate SQL query       | 80     |
| 1       | Summarize an article     | 200    |
| 2       | Create resume bullet     | 60     |
| 2       | Improve LinkedIn bio     | 70     |
| 3       | Explain neural networks  | 300    |
| 3       | Generate interview Q&A   | 250    |
| 3       | Write cover letter       | 180    |
| 3       | Optimize Python code     | 220    |
+---------+--------------------------+--------+
Output:
+---------+---------------+------------+
| user_id | prompt_count  | avg_tokens |
+---------+---------------+------------+
| 3       | 4             | 237.5      |
| 1       | 3             | 133.33     |
+---------+---------------+------------+
Explanation: User 1 has 3 prompts and an average of
(120 + 80 + 200) / 3 = 133.33; their 200-token prompt is greater than
that average, so they are included. User 2 submitted only 2 prompts
(less than the required minimum) and is excluded. User 3 has 4 prompts
and an average of (300 + 250 + 180 + 220) / 4 = 237.5, with the 300 and
250 token prompts both greater than that average, so they are included.
```

Write your solution as a single `SELECT` query returning `user_id`,
`prompt_count`, and `avg_tokens` for every qualifying user, ordered by
`avg_tokens` descending then `user_id` ascending.
