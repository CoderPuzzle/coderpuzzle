# Solutions — A Number After a Double Reversal

## Check for a lost trailing zero

Reversing a positive integer loses information exactly when the original number ends in zero, because that zero becomes a discarded leading zero. A second reversal cannot restore it.

Therefore every positive number not divisible by ten survives two reversals, and zero itself also survives.

**Complexity:** `O(1)` time and `O(1)` space.
