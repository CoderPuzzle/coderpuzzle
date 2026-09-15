# Solutions — Most Beautiful Item for Each Query

## Sorted prices and prefix beauty

Sort the items by price and replace each beauty with the maximum beauty seen at or before that position. This prefix maximum means every item position summarizes all affordable choices up to its price, including items with duplicate prices.

For each query, use upper-bound binary search to locate the last item whose price does not exceed the query. Return its prefix maximum, or zero if the query is smaller than every price.

**Complexity:** `O(n log n + q log n)` time and `O(n)` auxiliary space.
