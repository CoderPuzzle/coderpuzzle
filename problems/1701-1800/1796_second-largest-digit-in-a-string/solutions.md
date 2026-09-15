# Solutions — Second Largest Digit in a String

Only distinct digit values matter: repeated occurrences of the same
digit count once, and the answer is `-1` whenever fewer than two
distinct digits appear. That collapses the input to a ranking over at
most ten values, so a single pass with two running variables settles
everything without any auxiliary container.

## Track the two largest distinct digits

Scan `s` once, maintaining `first` and `second`, the two largest
distinct digit values seen so far, both initialized to `-1`. A digit
greater than `first` promotes the old maximum into `second`; a digit
strictly between the two slots into `second`; a digit equal to either
tracked value changes nothing, which is exactly the distinctness rule.
Letters are skipped by a range check on the character code. At the end
`second` is the answer, and it survives as `-1` only when the string
offers zero or one distinct digits.

On `"dfa12321afd"` the distinct digits are {1, 2, 3}: the pass settles
`first` to 3 and `second` to 2. On `"abc1111"` every `1` equals the
tracked maximum, so `second` never leaves `-1`.

**Complexity:** `O(n)` time, `O(1)` space.
