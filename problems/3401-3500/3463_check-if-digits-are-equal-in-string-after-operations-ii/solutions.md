# Solutions — Check If Digits Are Equal in String After Operations II

With `s.length` up to `10⁵`, the `O(n²)` simulation of the easy version
(about `5×10⁹` digit additions) is far out of reach — the survivors must be
computed in closed form.

## Pascal row via Lucas' theorem and CRT

One operation replaces the digit vector `d` with `(I + S)·d` over `Z/10`,
where `S` shifts indices by one. Applying it `t = n - 2` times gives
`(I + S)^t`, whose entries are the binomials `C(t, j)` — the `t`-th Pascal
row. The two survivors are therefore `a = Σⱼ C(t, j)·d[j]` and
`b = Σⱼ C(t, j)·d[j+1]`, both mod 10, and the answer is `a == b`.

Computing `C(t, j) mod 10` per position is where number theory earns its
keep: `10 = 2 × 5`, and a residue mod 10 is determined uniquely by its
residues mod 2 and mod 5 (CRT). Lucas' theorem handles both — mod 2,
`C(t, j)` is odd exactly when every binary bit of `j` is also set in `t`
(`j & ~t == 0`); mod 5, it is the product of `C(tᵢ, jᵢ) mod 5` over the
base-5 digit pairs, each looked up in a 5×5 table. A 2×5 CRT lookup table
turns the residue pair into the coefficient digit, and both weighted sums
are kept reduced mod 10 as they accumulate — every intermediate fits in a
machine integer.

**Complexity:** `O(n log n)` time (`log₅ n` digit products per position),
`O(1)` extra space beyond the input.
