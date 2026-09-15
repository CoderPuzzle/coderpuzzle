# Richest Customer Wealth

## Description

You are given an `m x n` integer matrix `accounts`, where `accounts[i][j]`
is the amount of money the `i`-th customer has in the `j`-th bank. Return
the wealth that the richest customer has.

A customer's wealth is the amount of money they have across all of their
bank accounts. The richest customer is the customer with the maximum
wealth.

### Example 1

```text
Input: accounts = [[1,2,3],[3,2,1]]
Output: 6
Explanation: The 1st customer has wealth = 1 + 2 + 3 = 6, and the 2nd
customer has wealth = 3 + 2 + 1 = 6. Both customers are the richest with
a wealth of 6 each, so 6 is returned.
```

### Example 2

```text
Input: accounts = [[1,5],[7,3],[3,5]]
Output: 10
Explanation: The 1st customer has wealth = 1 + 5 = 6, the 2nd has
wealth = 7 + 3 = 10, and the 3rd has wealth = 3 + 5 = 8. The 2nd customer
is the richest with a wealth of 10.
```

### Example 3

```text
Input: accounts = [[2,8,7],[7,1,3],[1,9,5]]
Output: 17
```

### Constraints

- `m == accounts.length`
- `n == accounts[i].length`
- `1 <= m, n <= 50`
- `1 <= accounts[i][j] <= 100`

## Hints

### Hint 1

Calculate the wealth of each customer.

### Hint 2

Find the maximum element in the resulting array.
