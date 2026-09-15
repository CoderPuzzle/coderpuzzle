# Solutions — Product Sales Analysis V

## Price every sale, pool per user, sort

The answer lives at the user grain, and each user's number is built from
rows at the sale grain: `Sales` joins `Product` on `product_id` to put
each sale's unit `price` beside its `quantity`, and `GROUP BY s.user_id`
collapses all of a user's rows into one carrying
`SUM(quantity * price)` as `spending`. Pooling before reporting is what
makes the total right — several modest purchases weigh exactly as much
as one flashy order, because the sum never looks at how the spending was
split across rows or products.

The statement's presentation contract is one `ORDER BY`: `spending DESC`
puts the biggest spenders on top and `user_id ASC` breaks ties by ID.
Users exist in the answer only through `Sales`, so an empty sales table
forms no groups and reports nothing, while unbought products join to no
sale rows and cost nothing. (The judge compares result rows as an
unordered multiset, so that ordering is contract rather than
correctness.)

The join touches each of the n sale rows once; the aggregation sweeps
those n joined rows linearly, and the final sort orders the k ≤ n user
groups.

**Complexity:** `O(n log n)` time, `O(n)` space.
