# Solutions — Additive Number

## Split the first two numbers, verify by string addition

An additive sequence is fixed by its first two numbers: every later term is
forced to be the sum of the two before it, digit for digit and length for
length. So the search only has to choose where the first number ends and
where the second ends — at most `n^2 / 2` candidates — and the rest of the
string either follows or kills the branch. Once the pair is chosen,
verification is a greedy walk: add the two current numbers, insist that the
remainder of the string begins with exactly the sum's digits, then slide the
window forward and repeat until the string is consumed. The inner split
never lets the second number reach the end, so at least one digit stays for
the third number — a two-term string is never mistaken for a sequence.

The additions are done as schoolbook string arithmetic — carry the tens,
emit one digit at a time — and the operands never become machine integers.
That is also the answer to the statement's follow-up. The `n <= 35` bound
happens to keep every number that could appear in a _matching_ parse within
seventeen digits, comfortably inside a 64-bit integer, but rejected
candidates for the first two numbers run as long as thirty-three digits, and
nineteen nines already overflow a `long long` at the moment it would be
parsed. Staying in digit strings makes the check exact for addends of any
size, so no bound on the input length would change a line of it. The
leading-zero rule is enforced at the two chosen numbers — more than one
digit and opening with `0` rejects the split — and carries through the rest
for free: the sum of two legally spelled numbers is either longer than its
addends or the lone `0` of `0 + 0 = 0`, so a sum can only match a next
number that is itself spelled without a leading zero.

**Complexity:** `O(n^3)` time — `O(n^2)` candidate splits, each verified with
at most `n` string additions bounded by the remaining length — and `O(n)`
space, with `n <= 35` throughout.
