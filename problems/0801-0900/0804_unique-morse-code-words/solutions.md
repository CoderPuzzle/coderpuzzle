# Solutions — Unique Morse Code Words

Every word collapses to one string — the concatenation of its letters' Morse
codes — and the question is only how many distinct strings the array produces.
The mapping itself is fixed by the given table and depends on nothing about
the input, so two words land in the same bucket exactly when their
transformations come out identical, whether that happens because the same
word repeats (Example 2) or because different words happen to encode alike
(Example 1).

## One transformation per word, one hash set

The 26-entry table is a constant array indexed by a letter's position in the
alphabet: entry `c - 'a'` is that letter's code, so a word's transformation
is those entries joined in the word's order —
[".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."].

Dropping each transformation into a hash set does the counting exactly as
asked. Example 1 is the collision showcase: "gin" and "zen" both become
"--...-." while "gig" and "msg" both become "--...--.", so the set ends up
holding two strings and its size is the answer. Collisions are not an
artifact of repeated words, either — the codes of "a" and "et" both spell
".-", so any two words sharing a code sequence fold into one bucket. With at
most 100 words of at most 12 letters, no transformation exceeds 48
characters and the whole corpus stays a few kilobytes.

**Complexity:** `O(total characters)` time, `O(total characters)` space.
