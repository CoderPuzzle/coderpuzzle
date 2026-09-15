# Solutions — Low-Quality Problems

## Compare the ratio by cross multiplication

The strict threshold `likes / (likes + dislikes) < 3 / 5` can be tested
exactly as `5 * likes < 3 * (likes + dislikes)`. This avoids integer-division
truncation and floating-point rounding, and the strict inequality correctly
excludes a problem at exactly 60%.

Filter by that integer predicate, project `problem_id`, and order the surviving
rows numerically in ascending order as required. No grouping is needed because
`problem_id` is the table's primary key.

**Complexity:** `O(n log n)` time and `O(n)` space for ordering the qualifying rows.
