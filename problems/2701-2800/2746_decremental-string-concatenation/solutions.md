# Solutions — Decremental String Concatenation

## Prefix DP over first and last characters

Only three things about the string built so far can ever matter: its first
character, its last character, and its length. A join deletes a character only
when the two boundary characters meeting at the seam are equal, and each
remaining operation touches exactly one boundary of the current string. So any
two partial concatenations of the same prefix of `words` that share their
first and last characters are interchangeable for everything that follows:
after appending or prepending the next word they again share first and last
characters and their lengths differ by the same constant, so an induction over
the remaining words shows neither can ever beat the other. Keeping only the
shortest length for every `(first, last)` pair therefore loses nothing.

The dynamic program processes `words` left to right over a 26 × 26 table
indexed by those boundary characters. The first word seeds one state with its
own length. Each next word splits every live state into two successors:
appending on the right costs `len(word)` minus one when the state's last
character equals the word's first character; prepending on the left saves one
when the word's last character equals the state's first character. After the
final word the answer is the smallest entry left in the table.

**Complexity:** `O(n · 26²)` time, `O(26²)` space.
