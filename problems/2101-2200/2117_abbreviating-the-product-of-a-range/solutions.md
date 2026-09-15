# Solutions — Abbreviating the Product of a Range

## Compute zeros, suffix, and prefix separately

Sum base-10 logarithms to obtain the stripped product's digit count and leading five digits. Separately remove every factor of `2` and `5` from the range factors, count them, and multiply the remaining parts modulo `10¹⁰`; pair the factors into trailing zeros, then restore only the unmatched powers. This modulus preserves the complete value whenever at most ten digits remain and also contains the required five-digit suffix otherwise.

For more than ten digits, the fractional part of the adjusted logarithm yields the leading five digits, while the modular value yields a zero-padded five-digit suffix. All modular products use 64-bit integers, and unmatched factors are restored one multiplication at a time so intermediate values remain safely bounded.

**Complexity:** `O((right - left + 1) * log right)` time and `O(1)` auxiliary space.
