# Solutions — Maximum Swap

## Last occurrence of each digit

One swap can raise exactly one position, and a position is worth more the
further left it sits, so the best swap moves the largest available digit as far
left as it can go. Record, for each digit value 0 through 9, the index where it
last occurs, then scan the digits left to right: at the first position whose
digit is smaller than some digit occurring later, swap it with the largest such
digit, taken from its last occurrence. That first eligible position is where the
profit is — `2736` improves at index 0 by pulling the 7 forward (`7236`), and
`98368` improves at index 2 by swapping the 3 with the 8 (`98863`). The
last-occurrence tiebreak shows on `1993`: the 1 goes out for the **rightmost**
of the two 9s, giving `9913` — taking the first 9 would strand a small digit
mid-number and answer only `9193`. If no position qualifies, the digits are
already non-increasing and `num` itself is the answer (`9973`, `4321`, any
single digit).

Why this is the optimum. Improving a more significant position always beats any
improvement further right, so the leftmost position that can be raised at all
must be the one raised — no swap touching a later position can compensate for a
larger digit sitting further left. Within that position, the largest digit
occurring to its right is the best payload, and taking its **last** occurrence
pushes the displaced smaller digit into the least significant slot open to it,
which minimizes what the swap gives back. Since the swap partner is always
strictly larger than the digit it replaces, the leading digit can only grow — a
swap can never create a leading zero, so `100000000` correctly stays itself.

**Complexity:** `O(digits)` time, `O(1)` space — the last-occurrence table is
ten slots whatever `num` weighs.
