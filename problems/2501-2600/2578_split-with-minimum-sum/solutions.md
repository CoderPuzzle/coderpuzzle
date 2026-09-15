# Solutions — Split With Minimum Sum

## Sorted Alternating Digits

The concatenation condition only pins down the digit multiset — the two
parts can use the digits in any order and with leading zeros. So the
task is really: deal every digit of num to one of two piles, then order
each pile to minimize the sum of the two values. For a fixed split,
ordering each pile ascending is clearly best; what remains is choosing
the deal.

Sorting all digits ascending and dealing them alternately (first,
third, fifth… to num1; second, fourth… to num2) is optimal. Two
exchange arguments finish it: if some larger digit ever leads a part
while a smaller one leads the other, swapping them lowers the sum;
and once lead digits are settled the same argument applies to the
next position, pushing small digits into high places in both numbers
simultaneously. With `num <= 10⁹` there are at most 10 digits, each
part holds at most 5 significant ones, so both parts stay below
`10⁵` and the sum never approaches 32-bit territory.

**Complexity:** `O(d log d)` time for `d <= 10` digits, `O(d)` space.
