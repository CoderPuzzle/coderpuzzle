# Solutions — Maximum Price to Fill a Bag

## Greedy Fractional Fill by Unit Price

Because items are divisible into parts with price and weight splitting proportionally, this is a fractional knapsack with a single capacity: the optimal policy is provably greedy. For any fractional packing, swapping a unit of weight from a lower price-per-weight item to a higher one never decreases the total price, so filling the bag strictly in decreasing order of `price / weight` maximizes the total — take each item whole while it fits, and split only the first item that overflows, taking just the fraction `remaining / weight` of it.

The implementation first guards feasibility: if the total weight of all items is below `capacity`, no packing (even fully fractional) can fill the bag and the result is `-1.0`. Otherwise it sorts items by unit price descending, accumulates whole-item prices while `remaining` covers the weight, and on the first item heavier than what remains adds `price * (remaining / weight)` and zeroes the remainder; a leftover `remaining <= 0` stops the loop early.

The returned value is a `float`, computed through one fractional multiplication, which is why the judge accepts answers within `10⁻⁵` of the exact result rather than comparing exactly. All prices and weights are positive integers, so the sort comparator `item[0] / item[1]` is well defined and the whole-item prefix sums are exact; the only floating-point rounding enters through that final split. Sorting is the dominant cost, and the answer is assembled in a single pass afterwards.

**Complexity:** `O(n log n)` time, `O(n)` space for the sorted copy.
