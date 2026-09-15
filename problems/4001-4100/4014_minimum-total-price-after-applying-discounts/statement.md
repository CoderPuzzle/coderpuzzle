# Minimum Total Price After Applying Discounts

## Description

You are given two integer arrays `prices` and `discounts`.

The value `prices[i]` represents the price of the ith item, and `discounts[j]` represents a discount percentage.

You may apply discounts subject to the following rules:

- Each discount can be applied to at most one item.
- Each item can receive at most one discount.
- An item may also receive no discount.

If a discount of `d` percent is applied to an item with price `p`, its final price becomes `(p * (100 - d)) / 100`. The final price is not rounded.

Return the minimum possible sum of final prices after assigning discounts optimally. Answers within 10⁻⁵ of the actual answer will be accepted.

### Example 1

```text
Input: prices = [10,30,21], discounts = [50,60]
Output: 32.50000
Explanation:
Apply discounts[1] = 60 to prices[1] = 30, thus 30 * (100 - 60) / 100 = 12.
Apply discounts[0] = 50 to prices[2] = 21, thus 21 * (100 - 50) / 100 = 10.5.
prices[0] = 10 receives no discount, so it stays 10.
The total is 12 + 10.5 + 10 = 32.50000, which is the minimum possible.
```

### Example 2

```text
Input: prices = [100,70], discounts = [10,40,50]
Output: 92.00000
Explanation:
Apply discounts[2] = 50 to prices[0] = 100, thus 100 * (100 - 50) / 100 = 50.
Apply discounts[1] = 40 to prices[1] = 70, thus 70 * (100 - 40) / 100 = 42.
The total is 50 + 42 = 92.00000, which is the minimum possible.
```

### Example 3

```text
Input: prices = [7,3,9], discounts = [100,100]
Output: 3.00000
Explanation:
Apply discounts[0] = 100 to prices[2] = 9, thus 9 * (100 - 100) / 100 = 0.
Apply discounts[1] = 100 to prices[0] = 7, thus 7 * (100 - 100) / 100 = 0.
prices[1] = 3 receives no discount, so it stays 3.
The total is 0 + 0 + 3 = 3.00000, which is the minimum possible.
```

### Constraints

- `1 <= prices.length, discounts.length <= 10⁵`
- `1 <= prices[i] <= 10⁵`
- `1 <= discounts[j] <= 100`

## Hints

### Hint 1

For an item with price `p` and a discount `d`, the amount saved is `p * d / 100`.

### Hint 2

To minimize the total final price, maximize the total amount saved. Consider sorting both arrays and pairing larger prices with larger discounts.
