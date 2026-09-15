# Solutions — Minimum Cost of Buying Candies With Discount

## Make every third candy free from highest to lowest

Sort the costs in descending order. In each consecutive group of three, pay for the two most expensive candies and take the third for free. The free candy is no more expensive than either purchased candy, so every group is valid; any leftover one or two candies must be paid for.

Choosing the most expensive eligible free candy in each group maximizes the total discount. Sum all sorted positions except indices `2, 5, 8, ...` to obtain the minimum payment.

**Complexity:** `O(n log n)` time and `O(n)` auxiliary space for the sorted copy.
