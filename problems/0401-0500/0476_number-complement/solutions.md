# Solutions — Number Complement

## All-ones window mask

The flip is confined to the window `num` occupies: the examples take the
complement with "no leading zero bits", so the bits above the leading 1 are
not part of the representation and must stay untouched. XOR-ing `num` with a
run of ones exactly as wide as that window flips every bit inside it and
nothing above it, which is the whole answer.

The mask is grown rather than computed. Start at `1` and, while it is still
narrower than `num`, replace it with `mask * 2 + 1`: doubling a run of ones
and adding one extends it by one bit, so the mask is always `2^k - 1`, and
the loop stops at the first such run that covers `num`. `num ^ mask` is then
the complement — for `num = 5` the mask climbs to `111` and `101 ^ 111 = 2`.

At the top of the range the mask reaches `2^31 - 1`, the exact ceiling of a
signed 32-bit int, so the fixed-width languages build it in a wider type
(`long`, `long long`, `int64`, `i64`); Python's integers are unbounded and
JavaScript's doubles are exact far past this range, so they grow the mask in
plain arithmetic. Building the mask by multiplication rather than a shift
keeps every intermediate inside that wider type on purpose.

**Complexity:** `O(log num)` time, `O(1)` space.
