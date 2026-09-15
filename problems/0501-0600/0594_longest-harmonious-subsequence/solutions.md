# Solutions — Longest Harmonious Subsequence

## Count map over adjacent value pairs

A subsequence only deletes elements, and deletion never constrains the
survivors: any subset of positions may be kept, so which harmonious
subsequences exist depends on the multiset of values alone, never on the
order they appear in. A harmonious one spans a max-min gap of exactly 1,
which forces it onto precisely two values, `v` and `v + 1` — a single
value gives a gap of 0, and any wider spread breaks the bound. So every
candidate is described by a value pair, and its length is
`count(v) + count(v + 1)` whenever both values occur at least once.

The code builds that value-to-occurrences map in one pass, then walks the
distinct keys: whenever a key's successor `v + 1` is also a key, the pair
offers `count(v) + count(v + 1)` to a running maximum. Membership is the
both-present test for free, because a key's count is always positive.
Uniform input like Example 3 offers no adjacent pair at all and the answer
stays 0, while Example 1's counts of three 2s and two 3s make the pair
`(2, 3)` the winner at length 5.

**Complexity:** `O(n)` time, `O(n)` space.
