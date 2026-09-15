# Optimal Account Balancing

## Description

You are given an array of transactions `transactions` where `transactions[i] = [from_i, to_i, amount_i]` indicates that the person with ID = `from_i` gave `amount_i` dollars to the person with ID = `to_i`.

Return the minimum number of transactions required to settle the debt.

### Example 1

```text
Input: transactions = [[0,1,10],[2,0,5]]
Output: 2
Explanation:
Person #0 gave person #1 $10.
Person #2 gave person #0 $5.
Two transactions are needed. One way to settle the debt is person #1 pays person #0 and #2 $5 each.
```

### Example 2

```text
Input: transactions = [[0,1,10],[1,0,1],[1,2,5],[2,0,5]]
Output: 1
Explanation:
Person #0 gave person #1 $10.
Person #1 gave person #0 $1.
Person #1 gave person #2 $5.
Person #2 gave person #0 $5.
Therefore, person #1 only needs to give person #0 $4, and all debt is settled.
```

### Constraints

- `1 <= transactions.length <= 8`
- `transactions[i].length == 3`
- `0 <= from_i, to_i < 12`
- `from_i != to_i`
- `1 <= amount_i <= 100`

## Hints

### Hint 1

Net out each person's balance first; only the set of nonzero balances matters.

### Hint 2

A group of people whose net balances sum to zero can settle among themselves using exactly size - 1 transactions.

### Hint 3

Partition the nonzero balances into as many zero-sum groups as possible; the answer is the total number of people minus the number of groups.
