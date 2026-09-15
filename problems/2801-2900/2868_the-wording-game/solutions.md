# Solutions — The Wording Game

## Top-down entry sweep over first letters

A legal reply depends only on the last played word: it must be strictly
greater and begin with the same letter or the immediately following one.
Every earlier play is at most that word, so no word is ever replayed, and
the whole game state is just (last word, player to move). One dominance
argument then prunes the choice of reply: a reply available against a
larger word is also available against a smaller one, but not conversely,
so handing the opponent the larger threshold is never worse. A player who
stays in the current letter therefore answers with their largest remaining
word of that letter, and a player who jumps into the next letter enters it
at that letter's largest word.

After a player has spent their largest word of a letter, every future
threshold exceeds it, so they can never play in that letter again. That
collapses each fight above the opening letter to a single exchange: a
player enters letter c with their largest c-word; the opponent either
answers with their own largest c-word — possible only when it is larger —
and pushes the entrant out, or skips straight to letter c+1. Whoever is
pushed out exits upward if they still own that next letter, and their
entry value there decides the fight, while a pushed-out player with no
next letter simply loses. Sweeping c from z down to a makes enter[c] —
"the player who enters letter c with their largest word wins" — a
constant-time combination of the two per-letter maximum words and the two
entry values at c+1.

Alice's opener a[0] is forced, so only Bob's two options at it remain:
jump to the next letter at once, or answer inside the letter with his
largest word b1. If Alice can out-answer b1 with her largest word, Bob is
the one pushed out; otherwise Alice is — in both cases the pushed-out
side's next-letter entry value settles the line. Bob wins when either
option works, and Alice wins exactly when neither does. The sweep reads
each word once to take per-letter maxima and touches fixed 26-slot arrays
afterwards, so counters stay tiny and no recursion is involved.

**Complexity:** `O(|a| + |b|)` time, `O(1)` space.
