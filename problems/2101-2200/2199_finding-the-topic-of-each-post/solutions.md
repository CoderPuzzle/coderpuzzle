# Solutions — Finding the Topic of Each Post

## Whole-word keyword matching with a deduplicated GROUP_CONCAT

A keyword occurs in a post only when it appears as a whole word, so pad
the lowercased content with sentinel spaces and look for the keyword
wrapped the same way — that single `INSTR` test rejects prefix traps like
`warning` matching `war` without any tokenizing. The correlated subquery
collects the distinct topic ids of every keyword found in the post's
content; `GROUP_CONCAT(... ORDER BY ...)` renders them ascending and
comma-separated (distinctness comes from the `SELECT DISTINCT`, since one
topic may be expressed by several matched words). Posts with no match
produce an empty aggregate, which `COALESCE` turns into `"Ambiguous!"`.

**Complexity:** `O(P · K · L)` time for `P` posts, `K` keywords, and
content length `L`, `O(K)` auxiliary space.
