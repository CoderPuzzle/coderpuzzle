# Solutions — Uncommon Words from Two Sentences

One counting observation decides everything: "appears exactly once in one
sentence and not at all in the other" is the same as "appears exactly once
across both sentences", so a single occurrence count over the two sentences
classifies every word. The pinned order then costs nothing extra — an
uncommon word has exactly one occurrence, so re-walking `s1`'s words
followed by `s2`'s and emitting each word whose total count is 1 meets every
word at its only appearance, which is first-appearance order within each
sentence, `s1`'s words first.

## Count Both, Emit the Singles

Join the sentences with a space and split: one word stream whose order is
`s1`'s words then `s2`'s. Count the stream into a hash map — a word is
uncommon exactly when its entry reads 1 — then walk the same stream a second
time and keep each word with count 1.

The re-walk is what realizes the pinned order without a sort or a seen-list.
Words repeated inside their own sentence and words shared by both sentences
carry counts of at least 2 and are skipped at every occurrence, while each
singleton survives at its single position: `s1`'s singletons first, in the
order they appear, then `s2`'s. No word can be emitted twice, and no ordering
decision is ever left to hash iteration order.

**Complexity:** `O(n + m)` time, `O(n + m)` space.
