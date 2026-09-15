# Solutions — Largest Time for Given Digits

Every digit must be used exactly once, so a candidate time is nothing more
than a dealing of the four digits into the four slots H1 H2 M1 M2 — at most
`4! = 24` of them. That tiny, fully bounded space makes total enumeration
the honest tool: deal, keep the real clock times, and take the latest, with
no greedy placement order to justify and no carry case to get wrong.

## Enumerate the deals in minutes past midnight

Walk the ordered triples of distinct positions `i`, `j`, `k` over `0..3`;
the fourth position `l = 6 - i - j - k` is whatever is left, so the loops
visit each of the 24 deals exactly once. A deal survives when its hour
`arr[i]*10 + arr[j]` stays below 24 and its minute `arr[k]*10 + arr[l]`
stays below 60.

Each survivor is reduced to minutes past midnight, `hour*60 + minute`, and
the maximum rides against the sentinel `-1`. Minutes past midnight is a
faithful total order over the day's clock times — the latest time is exactly
the largest count — so no string comparison is needed anywhere.

When the sentinel survives to the end, no deal was a real time —
`[5,5,5,5]` can only draw hour 55, and `[2,3,9,9]` can draw hour 23 but
then no legal minute — and the empty string is returned. Otherwise the
winning count is formatted back as a zero-padded `HH:MM`; digits 2, 3, 5, 9
give the day's ceiling 23:59.

**Complexity:** `O(1)` time, `O(1)` space.
