# Get Highest Answer Rate Question

## Description

Table: `SurveyLog`

| Column Name | Type |
| ----------- | ---- |
| id          | int  |
| action      | enum |
| question_id | int  |
| answer_id   | int  |
| q_num       | int  |
| timestamp   | int  |

This table may contain duplicate rows. `action` is an ENUM (category) of
the type: "show", "answer", or "skip". Each row of this table indicates
the user with ID = `id` has taken an action with the question
`question_id` at time `timestamp`. If the action taken by the user is
"answer", `answer_id` will contain the id of that answer, otherwise, it
will be null. `q_num` is the numeral order of the question in the current
session.

The answer rate for a question is the number of times a user answered the
question by the number of times a user showed the question.

Write a solution to report the question that has the highest answer rate.
If multiple questions have the same maximum answer rate, report the
question with the smallest `question_id`.

Each testcase supplies its own `dataset`: the DDL seeds the `SurveyLog`
table with that testcase's rows. A question that was never shown has no
answer rate — there is nothing to divide by — so it never carries the
highest one. The result format is in the following example.

### Example 1

```text
Input: SurveyLog table from the dataset below.
Output:
survey_log
285
Explanation: question 285 was showed 1 time and answered 1 time. The
answer rate of question 285 is 1.0. Question 369 was showed 1 time and
was not answered — its skip counts in neither term. The answer rate of
question 369 is 0.0. Question 285 has the highest answer rate.
```

Write your solution as a single `SELECT` query returning one column,
`survey_log` — the `question_id` of the question with the highest answer
rate.

## Hints

### Hint 1

One group per question: GROUP BY question_id collapses the log, and each row contributes exactly one counted term — SUM(CASE WHEN action = 'show' THEN 1 ELSE 0 END) and its 'answer' twin tally the denominator and the numerator, so a skip adds to neither sum and a duplicated row counts once per copy.

### Hint 2

The rate is a ratio, and SQLite's integer `/` truncates (1/2 evaluates to 0, flattening every rate below 1): multiply the answer tally by 1.0 for a real quotient. ORDER BY that quotient DESC with question_id as the second key and LIMIT 1 implements highest-rate-then-smallest-id; equal quotients — 1/2 and 2/4, or 1/3 and 2/6 — are equal as doubles, so a true tie reaches the id tiebreak.

### Hint 3

A question with answers but zero shows divides by zero — its rate is undefined, not infinite: HAVING on the show tally (or any filter keeping only shown questions) removes those groups before the ranking, so they neither win nor disturb the ordering.
