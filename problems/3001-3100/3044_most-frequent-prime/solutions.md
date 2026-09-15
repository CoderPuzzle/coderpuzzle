# Solutions — Most Frequent Prime

## Eight straight walks from every cell

From every cell, march each of the eight directions straight to the edge of
the matrix — turning mid-walk is forbidden, so a path is fully described by
its starting cell and one direction. Appending the next digit with
`value = value * 10 + digit` materializes the number formed at every step,
which is exactly the frequency the statement counts: a number appears once
per walk that produces it, even when walks share their first digits.

Each produced number greater than `10` is primality-tested by trial division
over odd factors up to `sqrt(value)`; values never exceed six digits
(`m, n <= 6`, so paths hold at most six cells), which keeps every test cheap.
Primes tally their count in a hash map. After all walks finish, one scan over
the map picks the highest count, breaking ties toward the larger prime; an
empty map means no qualifying prime exists and `-1` is returned.

**Complexity:** `O(m · n · L · √V)` time where `L = max(m, n)` bounds each
walk and `V <= 999999` bounds the values tested, `O(p)` space for the `p`
distinct primes tallied.
