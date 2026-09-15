# Solutions — Encode and Decode TinyURL

## Counter-indexed base-36 suffixes

`encode` appends the URL to a list the object keeps for its lifetime and
returns `http://tinyurl.com/` followed by the URL's 1-based position in that
list, written in lowercase base-36 — `1` for the first encode, `a` for the
tenth, `z` for the 35th, and `10` for the 36th, where the suffix gains a digit.
Nothing is hashed, compressed, or deduplicated: encoding the same URL twice
appends a second entry and hands out the next position, and the digits come
from the position alone, so the output is fully determined by how many encodes
the object has already performed.

`decode` is the table lookup that scheme implies. It strips the fixed
`http://tinyurl.com/` prefix, parses the remaining digits back from base-36
into the position, and returns the list entry one below it. The problem
guarantees the input was encoded by the same object, and that is precisely
what makes the list a complete decode table: every position the suffix
alphabet can name up to the object's count was handed out by that object's own
`encode`, so the lookup never misses and never needs to validate.

The round trip holds by construction — positions are assigned in insertion
order and never reused or reordered, so each suffix names exactly one entry for
as long as the object lives. Both operations are a list append or an index
plus arithmetic on a counter-sized number; appending is amortized constant,
and the suffix itself stays a handful of digits (a new one every factor of 36),
while the list holds the `n` URLs encoded so far.

**Complexity:** `O(1)` time per operation amortized, `O(n)` space, where `n`
is the number of URLs encoded.
