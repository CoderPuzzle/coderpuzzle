# Solutions — Number of People Aware of a Secret

## Day-Indexed Counting DP with Sliding Window

Let `know[d]` be the number of people who first learn the secret on day `d`. A person who learns on day `d` starts sharing on day `d + delay` and keeps sharing through day `d + forget - 1`, contributing exactly one new person on each of those days; on day `d + forget` they no longer count as aware. So the number of people who learn on some day is fully determined by earlier days, and the process can be simulated forward without tracking individuals.

For each day from 2 to `n`, the new learners are the people born from every still-active sharer: days `d` with `d + delay <= day <= d + forget - 1`, i.e. `d` in `[day - forget + 1, day - delay]` (clamped at 1, before which nobody existed). Summing `know[d]` over that window gives `know[day]`, reduced modulo `10^9 + 7`. The window's endpoints both advance by one each day — a classic sliding-window structure — though with `n <= 1000` a direct inner loop over the range is already fast enough.

At the end of day `n`, the aware people are exactly those who learned within the last `forget - 1` days, i.e. the sum of `know[d]` for `d` in `[n - forget + 1, n]`; earlier learners have forgotten. The slice `know[n - forget + 1 : n + 1]` captures this, and since `forget <= n` the slice never reaches before day 1 incorrectly — the base case `know[1] = 1` seeds the whole cascade. Edge cases: `delay < forget` guarantees every sharer has at least one active day, and modular reduction of daily counts (but not of the window sum before storage) keeps numbers bounded.

**Complexity:** `O(n * (forget - delay))` time, `O(n)` space.
