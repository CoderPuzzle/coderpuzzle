# Solutions — Harshad Number

## Repeated division to digit sum

The problem decomposes into two facts already present in its own
definition. First, the digit sum of `x` falls out of the classic loop:
divide by ten, keep the remainder, repeat until nothing remains — this
peels off ones, tens, hundreds in order and needs no string conversion.
Second, once that sum `s` is known, "is a Harshad number" reduces to one
modulo test, `x % s == 0`, so the whole computation is `s` when the test
passes and `-1` otherwise.

The loop order guarantees at least one nonzero digit enters the sum — `x`
starts positive by constraint — so dividing by `total` afterwards can never
hit zero. Every intermediate value is bounded by the input: three passes at
most since `x <= 100`, each remainder below ten, giving plenty of headroom
inside any integer type including JavaScript's exact window.

**Complexity:** `O(1)` time (`x` has at most three digits), `O(1)` space.
