# Solutions — Simple Bank System

## Validate and update balances

Store the balances in a mutable array, using index `account - 1` for each valid 1-based account number. Deposits only need an account check, while withdrawals also require enough funds before subtracting the requested amount.

A transfer validates both accounts and the source balance before changing either account. Performing all checks first keeps a rejected transfer atomic; a valid transfer then subtracts from the source and adds to the destination. The fixed-width implementations use 64-bit balances, and the JavaScript implementations use `bigint` internally because repeated maximum deposits can exceed the exact integer range of `number`.

**Complexity:** The constructor takes `O(n)` time and `O(n)` space; each transaction takes `O(1)` time and `O(1)` auxiliary space.
