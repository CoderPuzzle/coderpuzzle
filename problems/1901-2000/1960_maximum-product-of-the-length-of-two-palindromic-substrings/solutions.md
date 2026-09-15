# Solutions — Maximum Product of the Length of Two Palindromic Substrings

Both solutions rest on the same pin: one palindrome sits entirely before the
other, so a boundary between adjacent positions always separates them — the
left pick lives in the prefix, the right pick in the suffix. If `L[i]` is the
length of the longest odd palindrome contained in `s[0..i]` and `R[i]` the
longest in `s[i..n-1]`, the answer is the largest `L[i] * R[i+1]` over all
boundaries, and the whole problem is computing those two arrays. The
bisection route asks each center how far symmetry reaches around it and
answers with palindrome probes that two rolling hashes price at constant
time. Manacher's sweep exploits the string's own symmetry instead, reusing
each proven radius to bound the next — which is where its log-factor
advantage lives.

## Double-Hash Radii with Per-Center Binary Search

Radii need no symmetry exploit to find — only a palindrome test. Around a
fixed center `c`, an odd palindrome of radius `k` contains one at every
smaller radius, so feasibility is monotone in `k`, and a binary search over
`[0, min(c, n-1-c)]` locates the maximal reach with `O(log n)` probes. Each
probe asks whether the window `s[c-k..c+k]` equals its own reversal, which is
substring equality against the mirrored window of the reversed string, and
rolling hashes turn that equality into an `O(1)` comparison.

The substrate is a pair of prefix-hash tables — one forward over `s`, one
forward over the reversed string — plus the base powers, all maintained
under two independent moduli, `10^9+7` and `10^9+9`. A window is accepted as
a palindrome exactly when its forward hash matches the reversal-side hash
under both moduli; a coincidental double match is a collision, roughly one
chance in `10^18` per probe, so a wrong radius across all `n log n` probes
is vanishingly unlikely — the price of trading Manacher's certainty for
simplicity. The fixed-width languages run the arithmetic in 64 bits
throughout; JavaScript and TypeScript split each multiply into 16-bit halves
so no intermediate exceeds `2^53`, where double arithmetic is still exact.

With the radii in hand, the cut sweep carries over unchanged: record per
index the longest odd palindrome ending and starting there, propagate the
length `m -> m - 2` shrink across neighboring indices, fold into running
maxima `L` and `R`, and price every boundary. Any lone letter is a length-1
palindrome, so both sides of every boundary contribute at least 1 and small
inputs like `"aa"` need no special casing.

**Complexity:** `O(n log n)` time, `O(n)` space.

## Manacher's Algorithm with Prefix and Suffix Best

The key insight is that the two palindromes must be non-intersecting, so there is some split point where the first palindrome lies entirely in a prefix and the second entirely in the corresponding suffix. If for every split position we know the longest odd palindrome fully inside the prefix and the longest one fully inside the suffix, the answer is the maximum of their product over all splits. So the problem reduces to computing, for each prefix and each suffix, the best odd-palindrome length contained in it.

Manacher's algorithm gives, for every center `c`, the radius `d1[c]` of the longest odd palindrome centered there in linear time. From that, the code records for each index `e` the longest palindrome that _ends exactly at_ `e` (`best_end`) and for each index `s` the longest one that _starts exactly at_ `s` (`best_start`). A palindrome ending at `e` with length `L` also yields one ending at `e - 1` of length `L - 2` (drop one character from each side, keeping it odd and centered the same), so a single right-to-left sweep propagates `best_end` leftward, and symmetrically a left-to-right sweep propagates `best_start` rightward. Running prefix maxima of `best_end` and suffix maxima of `best_start` then give the best lengths inside each prefix and suffix.

Finally, for every split between index `i` and `i + 1`, the candidate is `left[i] * right[i + 1]`. Every single character is itself an odd palindrome of length 1, so each side always contributes at least 1 and the product is always well-defined; no special case for small strings is needed beyond the split loop covering `i` from `0` to `n - 2`.

**Complexity:** `O(n)` time, `O(n)` space.
