# Solutions — Construct String with Minimum Cost (Easy)

## Prefix DP over every word at every position

Every partial string built by appending words is a prefix of `target`, so a
single position captures all the state there is: let `dp[i]` be the minimum
cost to assemble `target[:i]`, with `dp[0] = 0`. Each position extends every
distinct word that matches its next characters via
`dp[i + len(word)] + cost`, and duplicate words first collapse to their
cheapest occurrence — an identical word at a higher price can never help.
An unreachable `dp[n]` means no decomposition exists, which is the `-1`
case.

Greedy longest-match fails (an expensive long word can block cheaper short
ones), so every word is tried at every reachable position — and these Easy
bounds make that direct scan affordable: at most 50 words against a target
of at most 2000 characters. Each language's prefix test (`startswith` with
an offset, `compare`, `startsWith`, `HasPrefix`, a bounded slice) rejects a
word longer than the remaining suffix without reading past either string,
so the `i + len(word) <= n` guard keeps every comparison in range.

Any achievable cost uses at most one operation per character, so it is
bounded by `len(target) * max(cost) = 2 * 10⁸` — inside 32-bit range, though
the accumulators keep 64-bit room around the sentinel arithmetic (plain
number math in JavaScript/TypeScript stays exact since everything is far
below 2⁵³).

**Complexity:** `O(len(target) · total(words))` time (each reachable
position match-tests every distinct word once), `O(len(target))` space.
