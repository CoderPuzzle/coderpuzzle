# Solutions — Moving Average from Data Stream

## Ring buffer with a running sum

The stream offers one value at a time and each answer only needs the last
`size` of them, so the class keeps a fixed window array, a `head` index
marking the oldest slot, and a running sum. `next` writes `val` into that
oldest slot, subtracts the value it displaced from the sum (once the
window is full) and adds the new one, then returns `sum / count`. Nothing
is ever shifted or re-summed: one write, one addition, one subtraction,
one division per call.

While the window is still filling, `count < size`, nothing evicts and each
average covers the partial window — the first call always returns
`val / 1`. From the moment the window fills, every call drops exactly the
value that arrived `size` calls ago, and `head` wraps around the array
modulo `size`. Precision is where the running sum earns its keep: a full
window holds at most 1000 values of magnitude at most `10⁵`, so the sum
never leaves the exact-integer range (and stays far below `2⁵³` even where
integers are doubles), making the add and subtract updates exact — the
only rounding in the whole computation is the single final division
`sum / count`, which IEEE arithmetic performs identically in every
language, so `(1 + 10 + 3) / 3` is always the same full-precision double
`4.666666666666667`.

On the statement's example with `size = 3`, the window grows `[1]`,
`[1, 10]`, `[1, 10, 3]`, averaging `1.0`, `5.5`, `4.666666666666667`; the
fourth call writes `5` over the oldest slot `1`, leaving
`(10 + 3 + 5) / 3 = 6.0`.

**Complexity:** `O(1)` per `next`; `O(size)` space.
