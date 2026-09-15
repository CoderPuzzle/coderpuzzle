# Solutions — Stone Game IX

## Count residues and analyze parity

Only each stone's remainder modulo 3 matters. A remainder-zero stone leaves the running remainder unchanged, so it acts as a safe pass whenever the sum is already nonzero: it changes which player faces the next decisive remainder-1 or remainder-2 choice without advancing that choice. Therefore only the parity of the zero count matters. With an even zero count, Alice can win exactly when both nonzero remainder classes are present; if either is absent, Bob can steer play to exhaustion or make Alice take the losing sum.

After the first remainder-1 stone, safe nonzero choices consume one more remainder 1 and then alternate between remainders 1 and 2; starting with remainder 2 is symmetric. Thus matching pairs cancel strategically and only the imbalance can provide an extra safe tail. An odd number of zero stones reverses who faces that tail: an imbalance of exactly 2 is still insufficient, while a difference of at least 3 gives Alice the extra move she needs. Hence odd zero count wins exactly when `abs(count1 - count2) > 2`.

**Complexity:** `O(n)` time, `O(1)` space.
