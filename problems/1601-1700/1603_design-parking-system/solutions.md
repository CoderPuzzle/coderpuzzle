# Solutions — Design Parking System

## Three counters, one lookup each

Every question the lot ever gets asked reduces to "is a slot of this size
still free" — nothing about which car arrived when, or which slot exactly
it occupies, ever matters. So the whole system is three integers, one per
size, initialized from the constructor and decremented on a successful
park.

`addCar` reads the counter for the given `carType`, parks and decrements
it when positive, and otherwise leaves everything untouched and reports
failure. No slot is ever tracked by identity, and nothing is ever
returned to the pool, so a single comparison-and-decrement is the entire
operation.

**Complexity:** `O(1)` time per call, `O(1)` space.
