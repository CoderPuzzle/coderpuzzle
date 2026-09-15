# Solutions — Number of Even and Odd Bits

## Right-to-left bit peel

Because bits are indexed from the least significant end, a single
right-shift loop walks the indices in order: each iteration tests the
lowest bit, routes it into the even or odd bucket using the loop counter's
parity as the bit index, and shifts right. The process ends when nothing
remains, so it touches exactly the `⌊log₂ n⌋ + 1` bits n actually has.

The bucket routing is just `counter % 2` incremented per set bit — no
string building or lookup tables. All quantities stay tiny (n ≤ 1000 has
at most 10 bits), comfortably inside every language's native integer range
and trivially exact in JavaScript.

**Complexity:** `O(log n)` time (one pass over n's bits), `O(1)` space for
the fixed two-element answer.
