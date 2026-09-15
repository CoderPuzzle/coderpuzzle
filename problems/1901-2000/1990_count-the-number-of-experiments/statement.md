# Count the Number of Experiments

## Description

Table: `Experiments`

| Column Name     | Type    |
| --------------- | ------- |
| experiment_id   | int     |
| platform        | varchar |
| experiment_name | varchar |

`experiment_id` is the primary key (column with unique values) for this table.
`platform` is ENUM (category) of type `'Android'`, `'IOS'`, or `'Web'`.
`experiment_name` is ENUM (category) of type `'Reading'`, `'Sports'`, or
`'Programming'`. This table contains information about the ID of an experiment
done with a random person, the platform used to do the experiment, and the name
of the experiment.

Write a solution to report the number of experiments done on each of the three
platforms for each of the three given experiments. Notice that all the pairs of
(platform, experiment) should be included in the output including the pairs
with zero experiments.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Experiments`
table with that testcase's rows. The result format is shown in the following
example.

### Example 1

```text
Input:
Experiments table:
+---------------+----------+-----------------+
| experiment_id | platform | experiment_name |
+---------------+----------+-----------------+
| 4             | IOS      | Programming     |
| 13            | IOS      | Sports          |
| 14            | Android  | Reading         |
| 8             | Web      | Reading         |
| 12            | Web      | Reading         |
| 18            | Web      | Programming     |
+---------------+----------+-----------------+
Output:
+----------+-----------------+-----------------+
| platform | experiment_name | num_experiments |
+----------+-----------------+-----------------+
| Android  | Reading         | 1               |
| Android  | Sports          | 0               |
| Android  | Programming     | 0               |
| IOS      | Reading         | 0               |
| IOS      | Sports          | 1               |
| IOS      | Programming     | 1               |
| Web      | Reading         | 2               |
| Web      | Sports          | 0               |
| Web      | Programming     | 1               |
+----------+-----------------+-----------------+
Explanation:
On the platform "Android", we had only one "Reading" experiment.
On the platform "IOS", we had one "Sports" experiment and one "Programming"
experiment.
On the platform "Web", we had two "Reading" experiments and one "Programming"
experiment.
```

The output always holds exactly nine rows — one for every combination of the
three platforms and the three experiment names — with `num_experiments`
counting the matching rows in the table, and zero when none exist. Write your
solution as a single `SELECT` query returning three columns — `platform`,
`experiment_name`, and `num_experiments`, in that order.
