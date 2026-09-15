# Solutions — Tenth Line

Four routes to one line of a file, all stopping as soon as the answer
arrives. The shell-loop route carries its own counter and preserves each
line explicitly. The pipeline route starts at line ten and keeps the
first line that follows. The last two hand the streaming count to one
tool: sed addresses line ten directly and quits, while awk states the
same stop as a condition over its built-in record number.

## Shell Loop

The direct procedural reading: count lines until the counter reaches
ten, then print the line on hand and stop. A `while read` loop with the
field separator emptied (`IFS=`) and `-r` set reads each line verbatim —
no splitting, no trimming of leading spaces, no backslash mending.

The counter begins at zero and advances after every successful read. If
the input ends at line nine, the condition is never true and the loop
falls through without printing anything. If line ten arrives, `printf`
reproduces it and `break` ensures the rest of the file is never read.
This is the most explicit route: the shell itself owns both the line
number and the short-file behavior.

**Complexity:** `O(1)` time beyond reading at most ten lines, `O(1)`
space.

## From Line Ten, Take One

The tempting formulation runs the prefix tools in their usual order —
`head -n 10 | tail -n 1` — and it hides a trap: for a file with four
lines, `head` emits four lines and `tail -n 1` prints the fourth, which
is exactly the wrong-answer behavior the statement forbids. The prefix
pipeline is only correct when the file is long enough.

Reversing the roles fixes it unconditionally. `tail -n +10` starts
printing at line ten; `head -n 1` keeps the first of those. A file with
ten or more lines yields line ten and only line ten. A shorter file
yields an empty stream, so nothing prints — the edge case is handled by
the addressing itself, with no count guard anywhere. (In practice the
cost stays near ten lines too: once `head` has its one line the pipe
closes and `tail`'s stream is cut off.)

**Complexity:** `O(1)` time beyond the ten-line neighborhood, `O(1)`
space.

## sed Line Address

sed answers in its native currency: line addresses. The script
`10{p;q;}` says that on reaching line ten, print it and quit — the `q`
matters, because plain `sed -n '10p'` would keep reading the file to the
end just to find nothing more to print.

No counting, no arrays, no guard: an address that never matches simply
never prints, so the shorter-than-ten case is handled by omission. One
process streams the input, and the `q` stops the stream at the answer.

**Complexity:** `O(1)` time beyond reading at most ten lines, `O(1)`
space.

## awk Streaming Condition

awk sees the file as records and keeps `NR`, the number of the record on
hand, as a live variable. The program `NR==10 { print; exit }` is the
whole algorithm: when the tenth record arrives, print it and stop —
`exit` skips not just the rest of the file but any remaining rules,
so nothing runs past the answer.

Like sed's, the condition handles the short file by omission: `NR==10`
stays false to the end and nothing prints. The idea is the same streaming
quit, stated as a predicate over a counter rather than an address — which
is also what makes it the flexible one, since any predicate (`NR % 2`,
`/pattern/`, a running sum) drops in where `NR==10` stands.

**Complexity:** `O(1)` time beyond reading at most ten lines, `O(1)`
space.
