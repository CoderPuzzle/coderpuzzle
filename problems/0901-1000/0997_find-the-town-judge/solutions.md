# Solutions — Find the Town Judge

## Net trust score per person

The judge's two properties translate directly into degree counts on the
trust relation: the judge trusts nobody, so their out-degree is 0, and
everybody else trusts the judge, so their in-degree is `n - 1`. Instead
of tracking the two counts separately, one pass over `trust` can fold
them into a single running score per person: each `[a, b]` pair
decrements `a`'s score (a says they trust someone) and increments `b`'s
score (b was trusted by someone). A candidate judge, trusting nobody and
trusted by everybody else, ends the pass with score exactly `n - 1`; no
non-judge can reach that value, since anyone who trusts even one person
loses at least one point, and anyone trusted by fewer than `n - 1` people
never gains enough.

After the scan, the answer is whichever label from 1 to n has score
`n - 1`, or -1 if no label does. When n is 1, the loop over trust never
raises anyone's score, and the lone person's score is trivially 0, which
equals `n - 1`, so they are correctly returned as the judge even with no
trust statements at all.

**Complexity:** `O(n + trust.length)` time, `O(n)` space.
