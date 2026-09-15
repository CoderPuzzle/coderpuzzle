# Solutions — Corporate Flight Bookings

## Difference Array and Prefix Sum

Each booking adds a constant to a contiguous range of flights — the textbook setting for a difference array. Instead of adding seats to every flight in [first, last], record +seats at index first−1 and −seats at index last (the zero-based slot just past the range end). After all bookings are stamped this way, one left-to-right prefix sum over the array produces the exact occupancy of every flight, because each +/− pair cancels exactly beyond its range.

The code allocates n + 1 slots so the decrement at index last is always in bounds even when last == n, then builds the answer list by accumulating the running total over the first n slots; the trailing extra slot is never read. The inclusive range semantics fall directly out of the offset choice: flight first−1 picks up the +seats on the very step it is stamped, and flight last still sees the seats because the matching −seats sits one index later.

This turns O(booking length) work per booking into O(1): two array writes at load time, then a single linear sweep. It is exact for arbitrarily overlapping bookings since addition commutes, and the values stay within comfortable integer range (at most 2·10^4 bookings × 10^4 seats).

**Complexity:** `O(B + n)` time, `O(n)` space, for B bookings over n flights.
