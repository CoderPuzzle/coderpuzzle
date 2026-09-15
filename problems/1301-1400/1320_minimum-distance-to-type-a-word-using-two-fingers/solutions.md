# Minimum Distance to Type a Word Using Two Fingers

## Approach: DP over (typed prefix, resting finger letter)

After each keypress, the state that matters is where the finger that just
typed sits (that is `word[i-1]`, fixed by the prefix) and where the other
finger rests. So `dp[o]` is the cheapest way to have typed the first `i`
characters with the resting finger on letter `o`; the slot `o = 26` models
the still-unused finger, whose distance from anything is 0 — that is the
"initial positions are free" rule.

Typing `word[i]` either moves the finger that just typed (cost
`dist(word[i-1], word[i])`, resting finger unchanged) or moves the resting
finger (cost `dist(o, word[i])`, the just-typed finger becoming the new
resting one). Rolling the array one step per character over all 27 rest
slots keeps the table at 27 entries; the answer is the minimum over rest
slots after the last character.

**Complexity:** O(n · 27) time, O(27) space.
