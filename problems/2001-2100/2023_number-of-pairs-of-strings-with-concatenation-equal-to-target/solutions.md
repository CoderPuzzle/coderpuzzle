# Solutions — Number of Pairs of Strings With Concatenation Equal to Target

## Check every ordered pair

The pair is ordered, so inspect every choice of first index and every choice of
second index. Skip only equal indices, concatenate the two strings in that
order, and increment the answer when the result equals `target`. Equal string
values at different indices remain valid choices.

There are at most 100 strings, making the full ordered pair scan small. Each
concatenation and comparison processes at most `L` characters and may allocate
an `O(L)` temporary string, depending on the language.

**Complexity:** `O(N² * L)` time, `O(L)` transient space.
