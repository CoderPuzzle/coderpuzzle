# Solutions — Sum of K-Digit Numbers in a Range

The corpus holds `m^k` numbers — with `k` up to `10⁹`, more summands than
could ever be enumerated. Summation is linear, though, so each digit position
can be accounted for on its own, and the whole answer collapses to three
modular powers.

## Per-Position Contribution

Let `m = r - l + 1` be the number of allowed digits and `S = l + (l+1) + ...

- r = (l+r)·m/2`their sum. Across all`m^k`strings, a fixed position`p`holds any particular digit`d`in exactly`m^(k-1)`of them — the other`k - 1`positions are free — so position`p`contributes`10^p · S · m^(k-1)`to the total. Summing over`p = 0..k-1`collapses the
place weights into the repunit`R(k) = (10^k - 1) / 9`, giving the closed
form `S · m^(k-1) · R(k)`.

Modulo `10⁹ + 7`, the repunit is reduced as `(10^k - 1) · 9⁻¹`: since
`9 · R(k) = 10^k - 1` over the integers, the residue of `R(k)` equals the
residue of the product, and `9⁻¹ = 9^(p-2) mod p` exists by Fermat's little
theorem because `gcd(9, p) = 1`. The whole answer is then two binary
exponentiations (`m^(k-1)` and `10^k`), one inverse, and a chain of
multiplications reduced at every step.

The numeric shape is narrow: every reduced factor sits below
`p < 2³⁰ < 2³¹`, so a product of two of them stays under `2⁶⁰` — exact in
the 64-bit integers of Java, C++, Go, and Rust (`S ≤ 45` never matters).
That same product approaches `10¹⁸` and passes `2⁵³`, so the JavaScript and
TypeScript ports run all modular arithmetic in BigInt and convert back to a
number only at the return.

**Complexity:** `O(log k)` time, `O(1)` space.
