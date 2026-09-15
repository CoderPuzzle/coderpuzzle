# Solutions — Sender With Largest Word Count

## Count words per sender with a hash map

Because the statement guarantees single spaces and no leading or trailing
spaces, a message's word count is just its number of spaces plus one, so
there is no need to split it into words. One pass over the chat log adds each
message's space count + 1 into a hash map keyed by sender; a final scan of
the map keeps the sender with the highest count.

The tie-break compares names as plain byte sequences: uppercase letters sort
before lowercase (`'A'` is 65, `'a'` is 97), so on an equal count `alice`
beats `Alice`, exactly as the Note describes. Every language below uses its
native string comparison, which is ordinal for these ASCII-only names.

**Complexity:** `O(total characters)` time, `O(n)` space.
