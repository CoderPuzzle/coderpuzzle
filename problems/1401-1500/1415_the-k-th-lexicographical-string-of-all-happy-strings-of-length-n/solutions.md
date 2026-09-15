# Solutions — The k-th Lexicographical String of All Happy Strings of Length n

## Counting descent through the lexicographic tree

The happy strings of length `n` form a complete tree of `3 · 2ⁿ⁻¹`
strings: three choices for the first letter, and exactly two for every
later letter (anything but the previous one). If `k` exceeds that total
the answer is empty — an `O(1)` test up front.

Otherwise the k-th string can be read off without generating anything.
In lexicographic order, the strings split into three consecutive blocks
by first letter, each holding `2ⁿ⁻¹` strings; `(k-1) / 2ⁿ⁻¹` selects the
first letter and subtracting that block leaves a smaller `k`. Inside a
block, the two allowed successors come in alphabetical order, each
heading a subtree of `2ⁿ⁻²` strings, so the same division picks the next
letter — and so on for each remaining position, halving the block size
each step. Ten characters at most means every count fits comfortably in
any integer width.

Each step is pure arithmetic: `O(n)` total work with no allocation
beyond the answer string itself.

**Complexity:** `O(n)` time, `O(n)` space for the result.
