# Solutions — Clear Digits

## Survivor stack, one pass

Processing left to right, the characters that have not yet been deleted
always occupy a prefix of positions, and deleting "the closest non-digit
to the left" of a digit removes exactly the last survivor in that prefix.
So the survivors themselves act as a stack: push every non-digit as it
arrives; a digit simply pops one. Digits are consumed and never pushed,
which also drops them from the output automatically.

Each character is handled once with a single push or pop, so nothing ever
gets rescanned. The judge guarantee that every digit is deletable is what
makes each pop safe.

**Complexity:** `O(n)` time, `O(n)` space.
