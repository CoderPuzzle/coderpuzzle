# Solutions — Minimum Sum of Four Digit Number After Splitting Digits

Every split reuses the same four digits, so the sum only depends on which
digit lands in which place — the problem is to hand out the four place weights
(two tens, two ones, one per number) as cheaply as possible.

## Sort the digits and pair smallest with largest

Splitting into two 2-digit numbers is always optimal: a 3-and-1 split puts
some digit in the hundreds place, whose weight 100 exceeds the 10 it would
contribute as a tens digit of a 2-digit number, so balancing both numbers at
two digits is never worse. Within that shape, the tens places carry the large
weights, so the two smallest digits should take them — sorting the digits
ascending and forming `10 * d0 + d2` and `10 * d1 + d3` pairs each small
digit with a large one and minimizes the weighted sum.

Duplicates and zeros need no special handling: leading zeros are allowed, so
`4009` legitimately splits into `4` and `9` (as `04` and `09`, sum 13), and
repeated digits simply land wherever the sort places them. The answer is
bounded by 198, comfortably inside every language's integer type.

Four digits make the sort constant work, and no allocation beyond a
four-slot array is needed in any language.

**Complexity:** `O(1)` time, `O(1)` space.
