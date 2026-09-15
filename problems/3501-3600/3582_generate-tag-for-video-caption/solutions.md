# Solutions — Generate Tag for Video Caption

## Normalize Words into Camel Case

The three actions run in order. Splitting the caption on runs of spaces
yields the words; joining them camelCase-style means the first word is
written fully lowercase while every later word keeps a single capital —
its first letter — with everything after it lowercased. That per-word
treatment is the whole subtlety: a word like `APPS` becomes `apps` in
first position but `Apps` later, and a lone `b` becomes `B`.

The second action strips anything that is not an English letter while the
leading `#` is exempted — under the stated constraints the caption holds
only letters and spaces, so the pass changes nothing, but it costs one
linear scan and keeps the pipeline faithful to the contract. The final
truncation counts the `#` itself: the result is cut to at most 100
characters total, which is why a 101-letter first word loses its last two
letters rather than one.

Every stage is a linear pass over a string of at most 151 characters, so
the work is constant-bounded end to end.

**Complexity:** `O(L)` time for `L = caption.length ≤ 150`, `O(L)` space.
