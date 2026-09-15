# Solutions — Count Pairs Of Similar Strings

## Letter-signature bitmasks with incremental pair counting

Similarity depends only on which characters appear in a word, never on how
often or in what order, so every word compresses losslessly into a 26-bit
signature holding one bit per lowercase letter. Two words are then similar
exactly when their signatures are equal, which turns string comparison into
a single integer comparison per pair candidate and collapses the cost of a
word to its length — hint 2's character set becomes one machine word.

The counting walk keeps a hash map from signature to how many earlier words
carry it. When the next word arrives, every earlier occurrence of the same
signature forms one valid pair, so adding the stored count before bumping it
lets the running total absorb whole groups automatically: k words sharing a
set contribute C(k, 2) pairs without ever revisiting an index.

The bounds stay comfortably narrow. At most 25 shifts keep any signature
inside a signed 32-bit integer, and with `words.length <= 100` the answer
cannot exceed C(100, 2) = 4950 — nowhere near overflow for any of the seven
languages, which all use plain widening integer arithmetic here.

**Complexity:** `O(total characters)` time, `O(n)` space.
