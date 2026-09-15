# Solutions — Maximum Score with Co-Prime Element

Precompute how many inputs are divisible by every divisor. For each possible selected value, inclusion-exclusion over its distinct prime factors counts conflicting elements, from which the cheapest modification count follows depending on whether that value already exists.

## Prime-factor inclusion-exclusion

Precompute how many inputs are divisible by every divisor. For each possible selected value, inclusion-exclusion over its distinct prime factors counts conflicting elements, from which the cheapest modification count follows depending on whether that value already exists.

**Complexity:** `O(M log M + M·2^ω) time, O(M) space`.
