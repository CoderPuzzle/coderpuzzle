# Solutions — Reconstruct Original Digits from English

## Letter counts and a subtraction ladder

The scramble destroys word order but not letter totals, and five letters are so
distinctive that they name their digit outright: `z` occurs only in "zero", `w`
only in "two", `u` only in "four", `x` only in "six", and `g` only in "eight".
One counting pass over the string therefore reads off the counts of 0, 2, 4, 6
and 8 directly, with no bookkeeping at all.

Every remaining digit owns a letter shared with only already-settled digits, so
a fixed subtraction ladder finishes the job: `h` appears in "three" and
"eight", so 3 is `h` minus the known count of 8; likewise `f` gives 5 after 4,
and `s` gives 7 after 6. Then `o` — shared by zero, one, two and four — yields
1 after subtracting 0, 2 and 4, and `i` — shared by five, six, eight and nine —
yields 9 after subtracting 5, 6 and 8. The letter `n` is never consulted:
"nine" carries two of them against one apiece in "one" and "seven", an
accounting trap its single `i` sidesteps entirely, and `e`, the busiest letter
of all, is left equally unused.

Finally the answer is emitted in ascending digit order, each digit repeated as
often as it was spelled — exactly the order the statement demands, whatever
the scramble was. The counts live in a fixed 26-slot table (a plain map in the
dynamic languages), so the work is one scan plus constant arithmetic.

**Complexity:** `O(n)` time, `O(1)` space.
