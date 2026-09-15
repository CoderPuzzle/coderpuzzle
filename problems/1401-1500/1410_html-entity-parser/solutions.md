# Solutions — HTML Entity Parser

## Single left-to-right scan with a lookup table

The replacement rule is deliberately not idempotent: whatever a
replacement produces must not be re-read as the beginning of another
entity. That rules out chained `replace` calls (which would turn
`&amp;lt;` into `<`) and points to a single scan that consumes each
entity as a whole token.

The scanner walks the string with one index. Whenever the current
character is `&`, it tests the six known entity strings with a
`startsWith` check at that position; on a match it appends the mapped
symbol and jumps the index past the closing `;`, so the replacement is
never reconsidered. When nothing matches — a bare `&`, an unknown
sequence like `&ambassador;`, or a `&` not followed by a known entity —
the `&` is copied through verbatim and the scan advances by one. Every
other character is copied through unchanged.

With a hash table mapping each entity to its symbol, each `&` triggers at
most six constant-time prefix probes and the whole pass is linear in the
text length. The `10⁵`-character bound therefore runs comfortably, and
the token-by-token copying means a large string with no entities is
returned as-is rather than being rebuilt incorrectly.

**Complexity:** `O(n)` time, `O(n)` space for the output (or `O(1)`
extra beyond the answer when building it in place).
