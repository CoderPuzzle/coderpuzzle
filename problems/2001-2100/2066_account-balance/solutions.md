# Solutions — Account Balance

## Partitioned running sum

Convert each transaction into a signed change: a deposit contributes its positive `amount`, while a withdrawal contributes the negative amount. A windowed `SUM` partitioned by `account_id` and ordered by `day` then accumulates exactly the balance after each transaction, restarting from zero for every account.

The explicit `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` frame states that every earlier transaction of the account is included through the current row. A final `ORDER BY account_id, day` produces the ordering required by the statement and the exact row comparison.

**Complexity:** `O(T log T)` time and `O(T)` engine space for partition ordering, where `T` is the number of transactions.
