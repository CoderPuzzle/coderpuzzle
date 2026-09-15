# Solutions — Largest Number After Digit Swaps by Parity

## Sort each parity's digits, then refill the original parity slots

Same-parity swaps mean a digit can travel to any position originally holding
a digit of its own parity, and never to the other side. So each parity class
keeps exactly its original set of positions, and the best arrangement is
independent per class: put the biggest odd digits in the highest-value odd
slots (leftmost first), likewise for evens. Collecting the two classes,
sorting each descending, then walking the original number and consuming the
next largest digit of matching parity at every position produces the maximum
in one reconstruction pass.

With at most 10 digits this is sorting a handful of characters — constant
work per call. The parity pattern itself never moves; only the digits within
each class rearrange.

**Complexity:** `O(d log d)` time for `d` ≤ 10 digits, `O(d)` space.
