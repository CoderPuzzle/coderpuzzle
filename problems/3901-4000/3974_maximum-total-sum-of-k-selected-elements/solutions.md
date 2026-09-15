# Solutions — Maximum Total Sum of K Selected Elements

The solution selects the largest values and greedily assigns the useful
multipliers in descending order.

## Descending greedy pairing

Because every array value is positive, an optimal selection consists of the
largest `k` elements. Among their processing multipliers, only values greater
than 1 improve on ordinary addition, so at most `min(k, mul - 1)` elements
should use multiplication.

Sorting the selected values from largest to smallest pairs the largest value
with `mul`, the next with `mul - 1`, and so on by the rearrangement inequality.
The remaining selected values contribute unchanged. The accumulator is 64-bit
because the maximum total is larger than 32 bits.

**Complexity:** `O(n log n)` time, `O(n)` space.
