# Solutions — Add Strings

## Schoolbook column addition with a carry

Adding two numbers by hand, right to left, one column at a time, is the whole
algorithm. Keep two indexes starting at the right ends of `num1` and `num2` and
a running `carry`. Each column sums at most three small values — two digits and
the incoming carry — so the total never exceeds 19, the digit to emit is
`total % 10`, and the carry to propagate is `total / 10`. No whole input is ever
converted to an integer, which is exactly what the statement forbids: only
single characters are read, each turned into a 0–9 value by subtracting the
character code of `'0'`. That keeps the method honest at the `10⁴`-digit
ceiling, where the numbers are far beyond what a 64-bit integer — or a JS
`number` — could hold anyway.

The loop runs while either string still has a column left **or** a carry is
pending. The `or carry` clause is what appends the final leading `1` when the
sum is one digit longer than both inputs (`999…9 + 1`). Inside the loop each
side contributes only while its index is still in range, so unequal lengths
need no padding: when the shorter number runs out, the remaining columns are
just the longer number plus the carry. A `"0"` input behaves like an empty
number and vanishes on its own.

Digits are produced least-significant first, so the collected list is reversed
before being joined into the answer. The walk covers `max(n, m)` columns plus at
most one final carry column.

**Complexity:** `O(max(n, m))` time, `O(1)` extra space beyond the output.
