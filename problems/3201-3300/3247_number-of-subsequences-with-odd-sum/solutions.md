# Solutions — Number of Subsequences with Odd Sum

## Prefix Parity Counting

Scan the array once while carrying two counters: `even`, the number of
subsequences of the scanned prefix whose sum is even, and `odd`, the
number whose sum is odd. The empty prefix has exactly one subsequence —
the empty one, whose sum is even — so the scan starts from
`even = 1, odd = 0`.

Each element `x` offers every existing subsequence a binary choice,
skip or extend, which doubles the total count and splits by parity.
Extending with an even `x` cannot change a sum's parity, so both
counters simply double. Extending with an odd `x` flips the parity of
whatever it extends: every even-sum subsequence gains an odd-sum
counterpart and every odd-sum one gains an even-sum counterpart, so
both counters become their sum. That flip is the whole recurrence —
sum parity has only two states, and adding an odd element acts exactly
as the involution that swaps them — so the pair evolves as
`even' = 2 * even, odd' = 2 * odd` on even elements and
`even' = odd' = even + odd` on odd ones. The answer is the final `odd`
counter, reduced modulo `10⁹ + 7`.

Both counters are reduced after every step, so they stay below
`10⁹ + 7` and every intermediate sum stays below `2 * (10⁹ + 6)`,
within 32-bit range.

**Complexity:** `O(n)` time, `O(1)` space.
