# Solutions — Rabbits in Forest

## Count each answer, round up to whole groups

A rabbit answering `k` describes a complete color group of `k + 1` rabbits,
so the array splits cleanly by answer value: rabbits that gave the same
answer may share a group — at most `k + 1` of them — while rabbits that gave
different answers never can. Nothing crosses that boundary, so the minimum
forest is just the sum of independent per-value minima, and each value's
question is only how many whole groups its respondents require.

One pass counts occurrences of every answer in a hash map. If the value `k`
is reported `c` times, those `c` rabbits have to fit into groups of capacity
`k + 1`, and `ceil(c / (k + 1))` groups are exactly enough: fewer cannot
hold `c` respondents, and more would only add whole spare groups. Every
group contributes its full size `k + 1` whether or not all of its rabbits
answered, so the value contributes `ceil(c / (k + 1)) * (k + 1)` — the two
1s of `[1,1,2]` share one group of 2 while the lone 2 pads its group to 3,
for 5 in total, and `[10,10,10]` sits inside a single group of 11.

The total stays small in every port's arithmetic: a value's contribution
exceeds its respondent count by at most `k`, so the forest is bounded by
`n` plus the sum of the distinct answers — at most `1000 + 499500 = 500500`
when all thousand answers are distinct — far inside the 32-bit range.

**Complexity:** `O(n)` time, `O(n)` space.
