# Solutions — Plus One

## Right-to-left carry

Adding one to a number written as digits can only disturb its suffix of trailing 9s. Scanning from the least significant digit, each 9 rolls over to 0 and passes the carry one place left, and the first digit below 9 absorbs the carry — it increments and the addition is finished, because nothing to its left ever changes. A digit array of at most 100 entries makes this the whole algorithm: no big-integer conversion is ever needed.

The loop returns from inside the moment a digit increments, so the untouched prefix is never even revisited. If the scan instead runs off the front, every digit was a 9, the carry rolled past the most significant place, and the number grew by one digit — 999 becomes 1000 — so the method returns a fresh `n + 1`-length array led by a 1 and zeros after it. In the fixed-width ports that array comes zero-initialized from the allocator, so only the leading 1 is written.

The input array is mutated in place, which is safe because it is returned as the answer and no digit left of the stopping position is read again. Digits only ever hold 0 through 9, so incrementing one can never overflow a cell; the single boundary the code must grow for is exactly the all-nines case.

**Complexity:** `O(n)` time, `O(1)` extra space.
