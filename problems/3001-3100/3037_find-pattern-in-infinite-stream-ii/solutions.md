# Solutions — Find Pattern in Infinite Stream II

## Streaming KMP

Build the KMP failure function over `pattern` once: `fail[i]` is the length
of the longest proper prefix of the pattern that is also a suffix of its
first `i + 1` bits. Then consume the stream one bit at a time while keeping
`matched`, the length of the longest pattern prefix ending at the bit just
read. On every `next()`, fall back along the failure links while the new
bit disagrees with `pattern[matched]`, extend on agreement, and return
`read - m` the moment `matched == m`. The automaton only ever holds the
longest prefix that could still end here, so no earlier start can match,
and the first full state is by construction the first occurrence.

Both ports run the same automaton; they differ only in plumbing. Each read
bit costs amortized O(1) fallback work (every fallback strictly decreases
`matched`, and each read raises it by at most one), so the whole run
touches every consumed bit a constant number of times. A sliding-window
rescan instead recompares up to `m` bits per arrival: at these bounds an
all-zeros stream against a nearly-all-zeros pattern forces billions of
comparisons, which the large hidden cases punish decisively.

Both variants call `next()` exactly `first_index + m` times and stop — a
match is guaranteed to start within the first 10⁵ bits, so the stream
never runs dry under a correct solution.

**Complexity:** `O(n + m)` time and `O(m)` space, where `m` is
`pattern.length` and `n` is the number of bits read up to the first match.
