# Solutions — Find Cities in Each State II

## One ordered pass per state: aggregate, filter with HAVING

The whole contract is a single grouped scan. The rows are first forced
into `(state, city)` order inside a subquery — the `LIMIT -1 OFFSET 0`
keeps the optimizer from flattening it, so `GROUP_CONCAT` reads each
state's cities already alphabetical and the one aggregate both joins
them with `', '` and counts the matches via
`SUM(SUBSTR(state, 1, 1) = SUBSTR(city, 1, 1))`, which is 1 for every
city whose first letter equals the state's.

`HAVING COUNT(*) >= 3 AND SUM(...) >= 1` applies the two eligibility
rules — a large-enough city set and at least one same-letter city — and
drops every state that fails either. The final sort orders by the match
count descending, breaking ties by state name ascending, exactly as the
statement requires; `New York City` sorting before `Newark` falls out of
plain byte-wise ordering because space sorts below letters.

**Complexity:** `O(n log n)` time, `O(n)` space.
