# Solutions — Word Frequency

Three routes to the word counts, ordered from the most laborious to the
leanest. The rescan loop states the problem directly and pays for it
with a full pass per distinct word. The classic pipeline normalizes the
whitespace and lets sort and uniq do the counting. The awk route counts
in one pass and sorts only the distinct words.

## Rescan Per Word

The direct reading: list each distinct word once, then ask the whole
input how many times that word appears. The input is buffered, the
distinct list comes from the same normalize-and-sort pipe the other
routes use, and `grep -c` with `-x` counts whole-line equals — so a
count is only ever taken after a full rescan.

The cost is the point of the example: `distinct × words` rescans make
the work grow with the square of the input's word traffic, and nothing
about the answer needs it. It is the baseline the next two routes
eliminate.

**Complexity:** `O(distinct × words)` time, `O(words)` space.

## Sort, Count, Reformat

`tr` squeezes every run of whitespace into a newline so the file reads
as one word per line; `sort` brings equal words together; `uniq -c`
collapses each run into its count; a second `sort -rn` orders by that
count; and a `while read` loop flips uniq's `count word` columns into
the required `word count`.

Nothing keeps state across lines in any tool — the sort owns the
grouping — so the route is four small programs in a row, each linear in
its input. The whole word stream is sorted, distinct or not, which is
the one cost the last route removes.

**Complexity:** `O(n log n)` time on the total word count, `O(n)` space.

## Count While Reading

awk splits each record into fields and bumps an associative array in a
single pass; the END block emits `word count` lines for the distinct
words only, and one numeric `sort -k2,2nr` orders them. The input is
read exactly once, and the sort sees `distinct` records instead of all
`n` word occurrences — which is the whole win, since distinct is never
larger and usually far smaller.

**Complexity:** `O(n)` time, `O(distinct)` space.
