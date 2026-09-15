# Solutions — Reschedule Meetings for Maximum Free Time II

Rescheduling one meeting can only create free time around the span it
vacates, so the whole problem lives in the `n + 1` gaps between consecutive
meetings (including the walls `0` and `eventTime`). Write `g[i]` and `g[i+1]`
for the gaps flanking meeting `i`, of duration `d`.

## Gap arithmetic with prefix/suffix maxima

Removing meeting `i` empties a span of length `g[i] + d + g[i+1]`. Two things
can happen. If some gap other than the two flanking ones is at least `d` long,
the meeting can move there outright and the entire emptied span becomes one
continuous free period of `g[i] + d + g[i+1]`. Otherwise the meeting can only
slide inside its own span, and pushing it flush against either wall leaves a
free period of `g[i] + g[i+1]`; relocating into a flanking gap is just such a
slide in disguise, so it never does better. Not moving anything keeps the
largest original gap, which is the answer's lower bound.

The only per-meeting question is the size of the largest non-flanking gap.
`prefix[i]` (maximum of `g[0..i-1]`) and `suffix[i+2]` (maximum of
`g[i+2..n]`) together cover exactly the gaps outside `{i, i+1}`, so one
forward and one backward pass turn each lookup into `O(1)` and the whole scan
stays linear. Every quantity involved is bounded by `eventTime`, so 32-bit
arithmetic suffices throughout.

**Complexity:** `O(n)` time, `O(n)` space.
