# Number of Steps to Reduce a Number to Zero

## Approach: Direct simulation

The rules are already a two-line loop: halve when even, subtract one when
odd, count the steps until the number reaches 0. Every step strictly
decreases the value (halving a positive even number, or subtracting 1),
so the loop terminates after at most about `2 · log2(num) + 1` steps —
at most 26 for the largest input 10⁶.

The two operations are exactly "clear the lowest set bit" and "shift
right", which is why the total also equals
`popcount(num) + bitlength(num) - 1`; the simulation states the same
count without appealing to that identity.

**Complexity:** O(log num) time, O(1) space.
