# Solutions — Remove Comments

A comment is whatever the scanner sees between its two markers, and the
statement pins the reading order: line by line, left to right, with the first
marker found winning. That makes the whole problem a two-state scanner —
plain code or inside a block comment — that walks the source once. The only
structural fact worth noticing is that the newline inside a block comment
dies with the comment, so the scanner must carry its half-built line across
line boundaries instead of flushing at every end of line.

## One pass with a block flag

Walk each line left to right holding an in-block flag and one buffer for the
line under construction. Outside a block, a `//` abandons the rest of the
line, a `/*` consumes two characters and raises the flag, and every other
character appends to the buffer. Inside a block, only a `*/` matters — it
consumes two characters and lowers the flag; everything else, including `//`
and `/*` lookalikes, is comment text. Skipping two characters when entering
is what enforces the non-overlap rule: after `/*` the closer is only tested
from the resume point onward, so `/*/` leaves the block open.

The buffer flushes exactly when a line ends outside a block, because only
then is the newline real; a line ending inside a block keeps its buffer for
the next line, which is how the code before an opener joins the code after
its closer into one output line (`"a"` and `"b"` merging into `"ab"` in
Example 2). A flush emits the buffer only when it holds at least one
character: an emptied line disappears, while a spaces-only leftover such as
the `"  "` in Example 1 survives. With `C` the total number of characters —
at most 100 lines of 80 — the scan touches each character a constant number
of times and stores only the output.

**Complexity:** `O(C)` time, `O(C)` space.
