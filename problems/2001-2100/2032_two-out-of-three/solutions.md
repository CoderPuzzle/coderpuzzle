# Solutions — Two Out of Three

## Track array membership with bitmasks

Give each input array one bit. For every value in an array, set that array's
bit in the value's mask. Setting a bit repeatedly has no effect, so duplicates
within one array cannot be mistaken for presence in multiple arrays.

A mask contains at least two set bits exactly when removing its lowest set bit
still leaves a nonzero value. Scan the possible values from 1 through 100 and
append those whose masks pass this test, which also produces the required
ascending order.

**Complexity:** `O(n1 + n2 + n3 + 100)` time, `O(100)` space.
