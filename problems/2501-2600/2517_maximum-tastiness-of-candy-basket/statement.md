# Maximum Tastiness of Candy Basket

## Description

You are given an array of positive integers `price` where `price[i]` denotes the
price of the `ith` candy and a positive integer `k`.

The store sells baskets of `k` distinct candies. The tastiness of a candy basket
is the smallest absolute difference of the prices of any two candies in the
basket.

Return the maximum tastiness of a candy basket.

### Example 1

```text
Input: price = [13,5,1,8,21,2], k = 3
Output: 8
Explanation: Choose the candies with the prices [13,5,21].
The tastiness of the candy basket is: min(|13 - 5|, |13 - 21|, |5 - 21|) = min(8, 8, 16) = 8.
It can be proven that 8 is the maximum tastiness that can be achieved.
```

### Example 2

```text
Input: price = [1,3,1], k = 2
Output: 2
Explanation: Choose the candies with the prices [1,3].
The tastiness of the candy basket is: min(|1 - 3|) = min(2) = 2.
It can be proven that 2 is the maximum tastiness that can be achieved.
```

### Example 3

```text
Input: price = [7,7,7,7], k = 2
Output: 0
Explanation: Choosing any two distinct candies from the candies we have will result in a tastiness of 0.
```

### Constraints

- `2 <= k <= price.length <= 10^5`
- `1 <= price[i] <= 10^9`

## Hints

### Hint 1

The answer is binary searchable: if a basket with tastiness at least x can be picked, then one with any smaller tastiness can be picked too.

### Hint 2

For a candidate x, use a greedy strategy to check whether it is possible to pick k distinct candies with tastiness at least x.

### Hint 3

Sort the prices and iterate from left to right; take a candy whenever its price differs from the last taken candy's price by at least x.

### Hint 4

A tastiness of x is achievable exactly when this greedy selection picks at least k candies.
