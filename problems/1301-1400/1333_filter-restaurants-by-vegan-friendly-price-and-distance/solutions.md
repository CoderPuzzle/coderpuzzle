# Filter Restaurants by Vegan-Friendly, Price and Distance

## Approach: Filter, then sort by (rating desc, id desc)

Each restaurant either passes all three filters or is dropped outright:
`veganFriendly = 1` requires the restaurant's own vegan flag to be 1
(the 0 case imposes nothing), and `price` and `distance` must not exceed
their caps — inclusive comparisons, so a restaurant exactly at a cap
passes. The survivors are ordered by rating descending, with ties broken
by id descending, and only the ids are emitted.

Sorting (id, rating) pairs with that comparator and projecting the id
gives the answer in one pass over the data; ids are not assumed to be
positions, so both fields travel through the sort.

**Complexity:** O(n log n) time, O(n) space.
