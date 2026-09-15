# Solutions — Next Day

The date arrives as a plain `"YYYY-MM-DD"` string and the answer is the
calendar date one step later in the same shape. That step can be walked by
hand — parse the three fields, step the day, and roll over through a
days-in-month table with the leap-year rule — or handed to the platform's
date engine, which renormalizes every rollover the step crosses. The
JavaScript and TypeScript entries keep the problem's original prototype
shape: the step lives on `Date.prototype` as `nextDay`, and the judged
entry constructs `new Date(date)` and delegates to the freshly enhanced
method (TypeScript merges the method into the global `Date` interface
first); in the other languages the same two approaches are the body of the
plain `nextDay(date)` function the harness calls.

## Hand-rolled calendar decomposition

Parse the year, month, and day fields out of the fixed-width string, step
the day-of-month by one, and decide the overflow with a days-in-month
table: February is widened to 29 on leap years — divisible by 4, except
centuries, unless divisible by 400 — and December's overflow carries into
the next year. A zero-padded formatter then renders month and day at two
digits and the year at four, so years below 1000 print in the fixed-width
form the format demands. Every piece is explicit, which is the appeal and
also the cost: the table and the leap rule are exactly the parts a
hand-rolled version can get wrong.

**Complexity:** `O(1)` time, `O(1)` space.

## Engine day arithmetic

The engine already contains this calendar. Parsing the string into the
runtime's date type and stepping it by one day renormalizes every field
the step rolls over — month lengths, leap years, the year boundary — and
the standard renderer prints the result already zero-padded, so nothing is
formatted by hand. Less code, no table to get wrong. Where a runtime ships
no calendar type at all, the same idea is spelled out directly: convert
the date to a linear day count, in which month lengths and leap years have
been absorbed into the numbering, add one, and convert back.

**Complexity:** `O(1)` time, `O(1)` space.
