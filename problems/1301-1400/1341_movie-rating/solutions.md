# Solutions — Movie Rating

## Approach: Two ranked subqueries, unioned in order

The output is two rows from two independent questions, so each becomes
its own ranked subquery and `UNION ALL` stacks them: the user row first,
then the movie row. For the user, `MovieRating` grouped by `user_id`
counts reviews, the join to `Users` supplies the name, and
`ORDER BY count DESC, name ASC LIMIT 1` applies both the greatest-count
rule and the lexicographic tie-break. For the movie, only February 2020
reviews (`created_at LIKE '2020-02-%'`) are grouped by `movie_id`,
averaged, joined to `Movies` for the title, and ranked
`ORDER BY AVG(rating) DESC, title ASC LIMIT 1`.

One `column` name (`results`) is shared by both branches so the union
presents a single column; `UNION ALL` (not `UNION`) keeps the two rows
distinct even if the user's name and the movie's title coincide.

**Complexity:** `O(R log R)` over the rating rows (the two group-bys and
their sorts), `O(1)` output.
