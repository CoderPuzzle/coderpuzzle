# Solutions — Count Integers With Even Digit Sum

## Check every value's digit sum

The domain is tiny (`num <= 1000`), so walking `1..num` and summing each
value's digits with repeated division by 10 answers the question
directly. Counting the values whose digit sum is even needs no pattern
work at this size.

**Complexity:** `O(num log num)` time (each value has O(log num) digits),
`O(1)` space.
