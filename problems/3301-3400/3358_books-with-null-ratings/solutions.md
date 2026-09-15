# Solutions — Books with NULL Ratings

## Direct NULL predicate with an ascending id sort

The whole task is one filtered scan. A rating that was never entered is
stored as SQL `NULL`, and the only comparison that detects it is the
dedicated `IS NULL` test — any equality against `NULL` evaluates to
unknown, so a query like `rating = NULL` (or its negation) silently
matches nothing.

`WHERE rating IS NULL` therefore keeps exactly the unrated books while
every rated row — including ratings of zero — drops out. The projection
returns the four requested columns without the rating itself, and the
final sort by `book_id` yields the required ascending order regardless
of how the dataset happened to be inserted.

**Complexity:** `O(n log n)` time, `O(n)` space.
