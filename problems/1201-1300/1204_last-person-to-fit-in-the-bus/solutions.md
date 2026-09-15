# Solutions — Last Person to Fit in the Bus

## Running total over boarding order

The bus admits people strictly in `turn` order, so a running total of `weight` ordered by `turn` tells us, for every person, the combined weight on board the moment they step on. A window `SUM(weight) OVER (ORDER BY turn)` computes exactly that cumulative weight for each row in one pass over the table.

A person boards only while that running total stays at or below the 1000-kilogram limit. Filtering `WHERE total <= 1000` keeps precisely the people who fit; among them the answer is the one with the largest `turn`, so ordering those survivors by `turn` descending and taking the first row yields the name of the last person to fit. The guarantee that the first person fits ensures the filtered set is never empty.

**Complexity:** `O(n log n)` time (the window is ordered by `turn`) and `O(n)` space.
