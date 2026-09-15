# Solutions — Binary Prefix Divisible By 5

## Running Remainder

The prefix value never needs to be built as an actual number — for an
array of length up to 10⁵ that number would be astronomically large.
Instead, track only its remainder modulo 5. Appending a bit to a binary
number doubles the number and then adds the bit, so the remainder
updates the same way: `rem = (rem * 2 + nums[i]) % 5`. Because `(2a) %
5` and `(2 (a % 5)) % 5` agree for any integer `a`, carrying only the
remainder from one step to the next loses no information relevant to
divisibility — `answer[i]` is simply `rem == 0` after folding in
`nums[i]`.

A single left-to-right pass computes every prefix's remainder from the
previous one in constant time, so the whole array is processed in one
linear scan with no auxiliary storage beyond the output.

**Complexity:** `O(n)` time, `O(1)` extra space (not counting the
output array), where `n` is the length of `nums`.
