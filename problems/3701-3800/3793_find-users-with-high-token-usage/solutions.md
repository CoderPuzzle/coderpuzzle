# Solutions — Find Users with High Token Usage

One grouped pass answers everything: collapse `Prompts` per `user_id`, and
each group already carries its prompt count and token mean — the two
inclusion rules then become a single `HAVING` clause on that same group.

## Group by user, filter in HAVING

`GROUP BY user_id` partitions the rows into one group per user, and the
SELECT list reads each group's own aggregates: `COUNT(*)` is the total
number of prompts the user submitted, and `AVG(tokens * 1.0)` their
average tokens per prompt. The `* 1.0` matters before any rounding: it
promotes the arithmetic to floating point so the mean keeps its fraction
(`400 / 3 = 133.33...`) instead of collapsing to an integer division
result, and `ROUND(..., 2)` then applies the statement's two-decimal
contract on top.

Both inclusion rules test the group itself, so they live together in the
`HAVING` clause rather than anywhere else. `COUNT(*) >= 3` is the prompt
threshold verbatim. The existence rule — "at least one prompt with tokens
greater than their own average" — needs no self-join or subquery: some
token exceeds a value exactly when the largest token does, so within the
already-grouped query `MAX(tokens) > AVG(tokens)` decides it. A user whose
tokens are all equal to their average (the flat-history case) has a
maximum equal, not greater, and drops out; a user with any spike survives.
Users failing either test never form output rows at all.

Finally `ORDER BY avg_tokens DESC, user_id ASC` produces the required
ordering: averages first from high to low, ties broken toward the smaller
id. SQLite evaluates the query as one scan plus one sort over the groups,
holding one accumulator set per user — linear in the table with space for
the distinct users.

**Complexity:** `O(n log u)` time, `O(u)` extra space.
