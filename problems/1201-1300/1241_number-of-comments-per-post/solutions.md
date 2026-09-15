# Solutions — Number of Comments per Post

## Distinct posts and distinct comments, then a counted left join

Duplicates run in both directions here — a post row may repeat, and the same
comment may appear more than once — so both sides are de-duplicated before
they ever meet. `posts` keeps one row per `sub_id` among the `parent_id IS
NULL` rows; `comments` keeps one row per (`parent_id`, `sub_id`) pair among
the rest, which counts each distinct comment once no matter how many times it
was submitted.

A left join from posts to comments preserves posts with no comments — `COUNT`
over the unmatched rows' nulls reports zero, exactly the `12 -> 0` case.
Comments whose parent is not a post in the table (the deleted post 7) simply
match nothing and vanish. Grouping by `post_id` and ordering ascending
finishes the report.

**Complexity:** `O(n log n)` time over the `n` submission rows (the distinct
passes and the final sort), `O(n)` space.
