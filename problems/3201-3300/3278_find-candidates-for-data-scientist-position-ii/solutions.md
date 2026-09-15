# Solutions — Find Candidates for Data Scientist Position II

## Join on skill, require full coverage, keep the top score per project

The pairing lives between two tables, so everything starts from the join
`Candidates c JOIN Projects p ON c.skill = p.skill`: each surviving row is
one skill a candidate shares with a project, carrying the proficiency and
the importance to compare it against. Grouping by `(p.project_id,
c.candidate_id)` collapses those rows into one candidate-project pair, and
full coverage becomes a pure count: both tables are keyed so each shared
skill contributes exactly one row, so the group qualifies only when its
`COUNT(*)` reaches the project's total requirement tally — a correlated
count over `Projects` for the same id. A candidate who misses a skill
contributes no row for it at all, leaving the group short, and `matched =
needed` filters them out before any scoring matters.

The score is conditional arithmetic over the grouped rows:
`SUM(CASE WHEN c.proficiency > p.importance THEN 1 ELSE 0 END)` tallies
the skills earning +10, its `<` twin tallies the −5 skills, equal pairs
touch neither sum, and the base is the flat 100 — integer arithmetic
throughout, so every score stays exact. Picking the winner is a ranking
over the qualified groups only: `ROW_NUMBER() OVER (PARTITION BY
project_id ORDER BY score DESC, candidate_id)` puts the highest score
first and breaks ties toward the lower id, and the outer `rn = 1` keeps
exactly that row. A project nobody fully qualifies for never produces a
qualified group at all, so it drops out of the result without special
handling.

The join emits one row per shared candidate-project skill; call the
`Candidates` row count `N`, the `Projects` row count `M`, and the joined
pair count `J`. Grouping touches each pair once, the window sorts each
project's qualified candidates, and the final ordering sorts one row per
surviving project.

**Complexity:** `O(N + M + J log J)` time, `O(J)` space.
