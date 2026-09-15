# Solutions — Delete Characters to Make Fancy String

A fancy string forbids three equal characters in a row, so the only place a
constraint bites is inside a maximal run of one repeated character: characters
of different letters never interact with each other's runs. Within a run of
length `L`, at most two of its characters can survive, and keeping exactly two
is clearly best, so the unique optimal answer keeps `min(2, L)` characters of
every maximal run and deletes the rest.

## Two-char lookback

The greedy scan builds the answer incrementally: append `s[i]` unless it equals
both of the two characters already appended, in which case adding it would form
three equal characters in a row and it is skipped. This reproduces exactly the
"truncate each run to two" rule while making a single left-to-right pass with no
need to find run boundaries first.

The check only ever looks at the last two positions of the growing result, so
the scan is linear and the output never exceeds the input length. JavaScript
and TypeScript build the result as an array of characters and join at the end to
avoid quadratic string concatenation; the Java solution uses a `StringBuilder`
and Go/C++/Rust append to growable buffers for the same reason. With `s.length`
up to `10^5`, the answer is at most `10^5` characters, comfortably inside the
configured output buffer.

**Complexity:** `O(n)` time, `O(n)` space for the result.
