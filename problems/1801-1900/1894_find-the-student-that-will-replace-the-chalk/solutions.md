# Solutions — Find the Student that Will Replace the Chalk

One full pass through the class consumes `sum(chalk)` pieces, so whole
rounds can be collapsed arithmetically instead of simulated; what
remains is a single scan to find the first student the leftover chalk
cannot supply.

## Reduce by total, then linear scan

Sum the array once and take `k` modulo that total — every complete round
consumes exactly `total` chalk, so the replacement happens during the
partial round described by the remainder. Walk the array subtracting
each student's usage; the first index where the running remainder drops
below `chalk[i]` is the answer. Both the total (`10^5 * 10^5 = 10^10`)
and the arithmetic need 64-bit integers.

**Complexity:** `O(n)` time for `n` students, `O(1)` extra space.
