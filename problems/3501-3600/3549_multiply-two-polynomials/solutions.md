# Solutions — Multiply Two Polynomials

## Fast Fourier Transform Convolution

The product coefficient `result[i]` is the convolution sum
`Σ poly1[j] * poly2[i - j]`; computing those directly is `O(n * m)` —
`2.5 * 10⁹` products at the constraint limits — so the product is
evaluated through the Fast Fourier Transform, whose hint the statement
gives. Multiplication of polynomials becomes pointwise multiplication of
their coefficient spectra: pad both inputs with zeros to a common power
of two (at most `2¹⁷` points here), run an iterative radix-2 FFT over
each, multiply the spectra pointwise, and run the inverse FFT.

The transform is iterative — bit-reversal permutation followed by
doubling merge passes with a twiddle factor carried along each block —
so it uses `O(n)` space and no recursion. The inverse is the forward
transform with the conjugate angle, scaled by `1/n`. Each output
coefficient is then a real number within rounding distance of the true
integer, and rounding recovers it exactly: with coefficients bounded by
`10³` and lengths by `5 * 10⁴`, the double-precision FFT error bound
(rounding is safe while the sum of squared inputs stays below
`9 * 10¹⁴`; here it is at most `10¹¹`) keeps the computed values
thousands of times closer than the `0.5` rounding threshold.

The results themselves exceed the 32-bit range — the center coefficient
of two all-`10³` polynomials reaches `5 * 10¹⁰` — so product
coefficients are carried and returned as 64-bit integers. They stay far
below `2⁵³`, so JavaScript `Number`s remain exact and the rounding in
every language lands on the same integer.

**Complexity:** `O(n log n)` time, `O(n)` space.
