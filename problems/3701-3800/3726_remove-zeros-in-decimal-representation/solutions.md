# Solutions — Remove Zeros in Decimal Representation

## Digit peel from the ones place

Deleting zeros never reorders anything, so the answer can be rebuilt while
`n` itself is consumed from its least significant end. Keep an accumulator
for the result and a running `place` that names the slot the next surviving
digit will occupy, both starting at one. While `n` is positive, take
`digit = n % 10`; when the digit is not zero, add `digit * place` to the
accumulator and multiply `place` by ten, then replace `n` by its quotient.
Zero digits fall through without touching either variable, which collapses
runs of zeros — interior, trailing, or stretching across almost the whole
number — to nothing.

The walk needs no string round-trip and no extra buffer: every step does
constant work, the accumulator only packs digits `n` already had, and both
values stay bounded by `n`. After the most significant digit has been
peeled the loop stops, leaving the accumulator holding the surviving digits
in their original order — exactly the required integer.

**Complexity:** `O(log n)` time, `O(1)` space.
