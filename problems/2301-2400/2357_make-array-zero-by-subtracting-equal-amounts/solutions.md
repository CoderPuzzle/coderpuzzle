# Solutions — Make Array Zero by Subtracting Equal Amounts

## Count the distinct non-zero values

Every operation peels one value class off the array. Choosing x as the
smallest positive element zeroes exactly the elements that currently equal
x, while every larger positive element merely drops to a new positive
value, and zeros stay zero — so each operation removes precisely one
distinct non-zero value from the array and creates none: subtracting a
common x cannot turn two different values equal or make any value smaller
than 0 reappear. The process ends when no positive element remains, which
takes exactly one operation per distinct non-zero value present initially.

Choosing a smaller x would leave the current minimum untouched and spend
an operation without retiring its value class, so the greedy choice is
also forced for optimality: the answer is simply the number of unique
non-zero values in `nums`. Collect `nums` into a set, discard 0 if
present, and return the set's size.

**Complexity:** `O(n)` time, `O(n)` space.
