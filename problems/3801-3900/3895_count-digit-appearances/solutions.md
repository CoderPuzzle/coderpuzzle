# Solutions — Count Digit Appearances

## Arithmetic digit scan

The task reduces each element to a list of its decimal digits and asks how
often `digit` occurs across all of them. Writing a value to base ten is
exactly repeated division by ten: the ones place is `x % 10`, and `x //= 10`
drops that place. The code walks every element and peels its digits with
that loop, comparing each extracted digit against `digit`.

Because every element is at least 1, the peeling loop never has to handle a
leading zero or an empty digit list — the moment `x` reaches 0 all of its
digits have been seen. Digits that appear more than once in a value (for
example the two `2`s of `22`) are counted naturally, once per peel.

A running total accumulates the matches across the whole array. Each value
has at most seven digits, so the amount of work is proportional to the
number of elements times a constant bound on their digits.

**Complexity:** `O(n)` time, `O(1)` space.
