# Solutions — Maximum Number of Words You Can Type

A word is typable exactly when it contains no broken letter, so the task
reduces to filtering the words against a small broken-key set.

## Broken-key set, per-word check

A word can be fully typed exactly when none of its letters is a broken
key, so the broken keys are collected into a set and each word is checked
against it. Splitting on the single-space separator yields the words, and
a word counts only if every one of its characters is absent from the set.

The scan is a plain left-to-right pass over the words; the set lookup is
constant time for each letter, so the whole cost is proportional to the
total number of characters in `text`. Because `brokenLetters` holds
distinct lowercase letters, the set has at most 26 entries regardless of
how long the input is.

**Complexity:** `O(n)` time, `O(1)` space.
