# Solutions — Report Spam Message

## Hash set of banned words with early exit

The spam rule only cares whether a message word is banned or not, so the
bannedWords array can be collapsed into a hash set of its words. Internal
duplicates in `bannedWords` collapse harmlessly — a word being banned twice is
the same fact as it being banned once — and building the set costs one pass
over at most 10⁵ short strings.

With the vocabulary in a set, a single scan over `message` counts how many
words hit it: every occurrence in `message` counts toward the total, so the
same banned word appearing twice in the message contributes two matches, and
two different banned words each contribute their own. The moment the counter
reaches two the answer is already decided and the scan can stop early — on a
100,000-word message whose first two words are both banned, no further work is
needed.

If the scan finishes with fewer than two matches, the message is not spam.
Each word costs one O(1) average-case lookup, so the whole check runs in time
proportional to the total characters read across both arrays.

**Complexity:** O(total characters) time, O(banned vocabulary) space.
