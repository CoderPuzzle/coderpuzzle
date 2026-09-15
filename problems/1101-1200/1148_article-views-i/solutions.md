# Solutions — Article Views I

## Filter self-views, deduplicate, sort

A row where `author_id = viewer_id` is exactly an author reading their own
article — the note in the statement says the two ids name the same person
when equal. Everything else in the row (which article, which date) is
irrelevant to the question, so one equality predicate isolates the rows that
matter.

`SELECT DISTINCT author_id` collapses the repeated self-views (the example
contains a literal duplicate row for author 4), the alias renames the column
to `id` as the result format asks, and `ORDER BY` finishes the contract of
ascending ids.

**Complexity:** `O(N log N)` time for the distinct-plus-sort over `N` Views
rows, `O(N)` space for the distinct set.
