# Solutions — Product of Two Run-Length Encoded Arrays

The expanded arrays are aligned index by index, so a segment of the
product always spans `min(remaining1, remaining2)` positions — whichever
encoding ends its current run first cuts the product run. Products are
then merged only when adjacent values coincide; no other compression is
possible without splitting runs.

## Two-pointer sweep over both encodings

Keep one cursor and a leftover count per encoding. Each iteration takes
the minimum of the two leftovers, multiplies the two active values, and
appends `[product, take]` to the output — extending the previous run
instead when the product matches. Whichever side hits zero advances to
its next segment and refills its leftover. The loop performs exactly one
step per output run, so it never materializes the expanded arrays.

Every input segment is consumed in one or more constant-time steps, and
each output run is written once.

**Complexity:** `O(|encoded1| + |encoded2| + |output|)` time, `O(1)`
extra space beyond the output.
