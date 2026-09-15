# Solutions — Ambiguous Coordinates

Recovering a coordinate means making three nested choices on the digit run:
where the comma sat, and where an optional decimal point sat inside each of
the two numbers. The no-extraneous-zeroes rule judges each choice
independently — one side never constrains the other — so the answer is a
product of small per-side form lists, gathered split by split.

## One form helper, three nested choices

Strip the outer parentheses and let `forms(t)` render a digit run every
legal way: with a decimal point after the first digit, then after the second,
and so on, and finally as the plain integer it already is. Two checks reject
a rendering: the whole-number part may not open with `0` unless it is
exactly `"0"`, and the fractional part may not end in `0` — those are
precisely the `001` and `1.0` shapes the statement bans — while the point
itself always keeps a digit on each side because neither the comma split nor
the point ever touches an end of a run. The bare integer survives only when
the run is `"0"` or opens with a nonzero digit.

The main loop walks each comma position through the run and pairs every left
form with every right form, wrapping the pair in parentheses with the
statement's single space after the comma. The loop nesting is the pinned
order: splits left to right, decimal forms before the plain integer on each
side, the left number varying slower than the right. A side with no legal
forms — `00`, for instance — kills its whole split silently, which is how
`"(0000)"` ends with an empty answer while `"(00)"` yields the single
`"(0, 0)"`; at the other extreme, ten digits with no zero at all render
every form legal, and the answer runs to 165 entries. With at most ten
digits the whole triple loop is a few thousand steps.

**Complexity:** `O(n³)` time, `O(n³)` space.
