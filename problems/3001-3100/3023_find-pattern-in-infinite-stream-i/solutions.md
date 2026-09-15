# Solutions — Find Pattern in Infinite Stream I

Both solutions honor the same contract: the channel is read once, in
arrival order, and the search stops the instant the first occurrence
completes. They differ in what they carry across arrivals. The rolling
window keeps the last `m` bits themselves and asks of every arrival,
"is this now the pattern?" — a simple question, but answered up to `m`
entries deep. The KMP automaton keeps only a count of the pattern bits
currently matched and lets the pattern's failure function settle, from
that count and the next bit alone, where the count now stands — the same
verdict reached without ever re-reading what the channel can no longer
give back.

## Rolling bit window

The stream gives each bit exactly once and in order, so the only state worth keeping is the last `m` bits — the sole candidates for a match ending at the current position. Maintain them as a window: on every `next()`, slide the new bit in and drop the oldest. After the `t`-th read the window holds bits `[t − m, t − 1]` (0-indexed), so comparing it with the pattern after every read tests every possible start exactly once, and the first hit is by construction the first occurrence.

The Python port packs the window into one integer — shift left, OR the new bit, mask to `m` bits — so each step is O(1) big-int work on numbers below 2¹⁰⁰, and the comparison is a single `==`. Java's `long` cannot hold 100 bits, so that port keeps a circular buffer of the last `m` bits and compares up to `m` entries per step (with an early exit on the first mismatch); over a prefix of at most 10⁵ bits that is at most 10⁷ elementary comparisons, well inside the time budget.

Both variants call `next()` exactly `first_index + m` times and stop — the match is guaranteed to begin within the recorded prefix, so the stream never runs dry under a correct solution.

**Complexity:** `O(n · m)` time in the worst case (Java buffer compare; the Python integer window is `O(n)` arithmetic steps), `O(m)` space, where `n` is the number of bits read before the first match.

## KMP Failure Automaton

The channel's no-rewind rule is exactly the regime the failure function
was built for: the method never asks to see a bit twice. Before touching
the stream it builds the KMP table over the pattern alone — `fail[k]` is
the length of the longest proper prefix of the pattern that is also a
suffix of its first `k` bits. The bits then run through the automaton one
arrival at a time: the state is the number of pattern bits matched so
far, and each new bit either extends the state by one or, on a mismatch,
walks it back through `fail` until the bit fits again.

The state after reading bit `t` is by construction the length of the
longest pattern prefix ending at `t`, so the first time the state reaches
`m` the match ends at `t` and begins at `t − m` — the returned index.
Every fallback shortens the state, and every unit of height it climbs was
raised by one distinct arrival, so the total fallback work is bounded by
the number of bits read and the scan is linear. All seven ports run the
identical array algorithm — one integer state and one table of `m + 1`
entries — with no bigint window and no per-language adaptation.

Like the rolling window, this variant calls `next()` exactly
`first_index + m` times and stops, far inside the 1 000 000-call budget;
the linear scan pays off in time, not in query count.

**Complexity:** `O(n + m)` time, `O(m)` space, where `n` is the number of
bits read before the first match.
