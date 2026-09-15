# Solutions — Keep Multiplying Found Values by Two

The process is a straight simulation: keep doubling `original` while it
is present in `nums`, and stop at the first value the array does not
contain. The only design decision is how "present" is answered.

## Hash set of the array, then double

Copy `nums` into a hash set once, then run the doubling loop against it.
Each step costs one expected-`O(1)` lookup instead of a fresh linear
scan of the array, so even the longest chain — every power of two from
`1` up to `512` present, walking `original` from `1` to `1024` — is a
handful of lookups after a single `O(n)` build.

The walk is short by construction. Every value in `nums` is at most
`1000`, so the final value is at most `2048`: the doubling must stop the
moment it passes the array's maximum. That bound keeps every
intermediate inside a 32-bit integer with enormous room to spare — and,
for the JavaScript family, far below the `2^53` point where `Number`
stops being exact, so plain arithmetic needs no BigInt detour.

**Complexity:** `O(n)` time, `O(n)` space.
