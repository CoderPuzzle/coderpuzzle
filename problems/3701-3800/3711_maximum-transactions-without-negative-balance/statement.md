# Maximum Transactions Without Negative Balance

## Description

An account opens the day at a balance of 0 and faces a fixed sequence of
transactions, where `transactions[i]` is the amount moved by the i-th
transaction: a positive value credits the account, a negative value debits
it. The transactions arrive in a fixed order. You may perform any
subsequence of them — skip as many as you like — but the ones you perform
keep their relative order, and after every performed transaction the
running balance must never drop below zero. Touching exactly zero is
allowed.

Return the maximum number of transactions you can perform without the
balance ever going negative. Performing nothing at all is always allowed,
so the answer is never negative.

### Example 1

```text
Input: transactions = [2,-5,3,-1,-2]
Output: 4
Explanation: One optimal sequence is [2, 3, -1, -2]; the balance moves
0 -> 2 -> 5 -> 4 -> 2 and stays nonnegative throughout. Taking -5 too
would have driven it to -3.
```

### Example 2

```text
Input: transactions = [-1,-2,-3]
Output: 0
Explanation: Every transaction is a debit, so performing any one of them
would start the balance below zero.
```

### Example 3

```text
Input: transactions = [3,-2,3,-2,1,-1]
Output: 6
Explanation: Everything can be performed in order; the balance moves
0 -> 3 -> 1 -> 4 -> 2 -> 3 -> 2.
```

### Constraints

- `1 <= transactions.length <= 10⁵`
- `-10⁹ <= transactions[i] <= 10⁹`

## Hints

### Hint 1

Scan the transactions left to right, keeping a running balance and a
collection `accepted` that tracks the sizes of the negative transactions
you have taken so far.

### Hint 2

Always take a nonnegative transaction: it can only raise the balance, and
it raises the count you are maximizing.

### Hint 3

If a negative transaction `t` is affordable (`balance + t >= 0`), take it
and record its absolute value in `accepted`.

### Hint 4

If a negative transaction would push the balance below zero but you have
previously taken a strictly larger debit, trade: refund that larger debit
and take the smaller current one instead. The count stays the same while
the balance recovers, which is what lets later, smaller debits fit.
