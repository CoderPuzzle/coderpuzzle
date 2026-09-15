# Solutions — Maximum Value of Concatenated Binary Segments

The total length is fixed, so maximizing the integer is the same as making the
concatenated binary string lexicographically largest. Comparing two segments
in both possible orders reveals a compact ordering specific to their one-run
then zero-run shape.

## Sort by run structure

A segment with no zeros belongs first because its ones extend the leading
one-run of every following segment. A segment with no ones belongs last. For
two remaining segments, the one with more leading ones belongs first; if the
one-runs tie, the segment with fewer zeros belongs first because it reaches
the next segment's one-run sooner. Sorting by these three categories therefore
produces the same order as comparing the two possible concatenations.

After sorting, stream the runs without constructing the binary string. For
each one, double the current value and add one; for each zero, only double it.
Reducing after every bit keeps every intermediate below twice the modulus, so
all languages, including JavaScript, evaluate the arithmetic exactly. Let `L`
be the total number of bits across all segments.

**Complexity:** `O(n log n + L)` time, `O(n)` space.
