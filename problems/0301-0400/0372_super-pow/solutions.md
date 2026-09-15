# Solutions — Super Pow

## Digit-by-digit modular exponentiation

The exponent arrives one decimal digit at a time, and that structure is all
the method needs: if the digits read so far form `x`, appending digit `d`
makes the exponent `10x + d`, and `a^(10x+d) = (a^x)^10 · a^d`. So a single
left-to-right pass keeps `result = a^x mod 1337` — starting from 1 for the
empty prefix — and for each digit replaces it with
`result^10 · a^d mod 1337`. When the last digit is consumed, `result` is
`aᵇ mod 1337`. The constraint's `b` has at least one digit and no leading
zeros, so the exponent is always a genuine positive integer and the loop
always runs at least once.

Each of the two factors per digit comes from `powmod`, a square-and-multiply
loop that walks the exponent's bits, squaring the base at each step and
folding it into the result on the set bits. `powmod` reduces its base mod
1337 on entry, so `a` needs no separate reduction; from then on every value
in play is below 1337, which keeps every product below `1337^2 = 1,787,569`
— comfortably inside 32-bit integers and a double's 53 exact bits. The
modulus being composite, `1337 = 7 · 191`, changes nothing: plain modular
exponentiation is correct for any modulus, so no CRT or Euler-theorem
machinery is required.

Example 2 traces the whole computation. For `a = 2, b = [1,0]` the running
result starts at 1; digit 1 gives `1^10 · 2^1 = 2`; digit 0 gives
`2^10 · 2^0 = 1024`, the answer. The exponent never exists as a number —
only its digits and the running residue do — which is what makes the
2000-digit ceiling of the constraint a non-event.

**Complexity:** `O(len(b) * log 10)` modular multiplications, `O(1)` space.
