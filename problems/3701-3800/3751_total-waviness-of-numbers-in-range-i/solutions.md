# Solutions — Total Waviness of Numbers in Range I

## Per-number digit scan

The range is small enough (at most 10⁵ numbers, each with at most six digits)
that the intended brute force from the hint is all the problem needs: walk
every number in `[num1, num2]` once and add up its waviness. The only real
content is computing one number's waviness correctly. Rather than converting
to a decimal string, decompose the number arithmetically: repeatedly take
`d = n % 10` and `n //= 10` to collect the digits least-significant first.
This keeps every language on the same integer path and sidesteps string
plumbing entirely.

While collecting the digits the scan can already score interior positions.
A digit at position `i` (counting from the least significant) has its right
neighbor at position `i - 1` — available immediately — but its left neighbor
only appears on the next extraction, so each iteration compares the previous
digit against both the current one and the next one before advancing. A
previous digit that is strictly greater than both neighbors is a peak; one
strictly smaller than both is a valley; equality on either side disqualifies
it. The first and last digits never enter this comparison as the middle
element, which is exactly the rule that first/last digits cannot peak or
valley, and numbers with fewer than three digits simply never trigger it.

The accounting stays tiny: below 10⁵ a number has at most six digits, so at
most three of them are interior candidates (the first and last are excluded),
and the grand total over the whole domain is well under three hundred
thousand — plain 32-bit integers hold everything in every language.

**Complexity:** `O((num2 - num1 + 1) · log₁₀ num2)` time, `O(1)` space.
