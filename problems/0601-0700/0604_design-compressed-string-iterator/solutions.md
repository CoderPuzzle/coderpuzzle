# Solutions — Design Compressed String Iterator

## Lazy single-segment state

The iterator never expands the string. It keeps exactly three pieces of
state: the current segment's letter, how many copies of that letter are
still unspent, and a parse position into the compressed string. `next`
spends one copy of the current letter; when the count reaches zero the
next call re-parses one segment — a letter, then its run of digits — to
load the following letter and count. Nothing is built up front, so a
count of `10⁹` costs the same few bytes of state as a count of 1, and
the calls that touch it do constant work.

`hasNext` answers without consuming anything: the iterator has more to
give whenever the current count is positive or the parse position has
not yet reached the end of the string — and because every segment's
count is at least 1, an unparsed remainder always means another real
letter. Once both conditions fail, `next` returns the white space `" "`
and keeps returning it on every further call; the spent letter simply
stays in place until a fresh segment overwrites it.

Reading a count must accumulate into a 64-bit integer: the digit run is
folded one digit at a time, multiplying by 10 before the value is
complete, so a 32-bit accumulator would overflow mid-parse on the
largest counts the constraints allow.

**Complexity:** `O(1)` amortized per call, `O(1)` space beyond the
compressed string itself.
