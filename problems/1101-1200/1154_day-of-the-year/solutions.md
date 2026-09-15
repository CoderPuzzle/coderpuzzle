# Solutions — Day of the Year

## Month table, February patched for the leap rule

The fixed format makes parsing three integer slices — `YYYY`, `MM`, `DD` at
offsets 0, 5, 8. The ordinal is the day plus the total length of every
month before this one, and eleven of those lengths never change, so they
come from a 12-entry table.

February is the only variable, decided by the Gregorian leap rule
(`div by 4, except centuries, except 400`): the table's second entry becomes
29 in a leap year. The constrained range 1900–2019 keeps the rule exactly
right at both ends — 1900 is the classic non-leap century, 2000 the
exception that is.

Summing `days[0..month-2]` and adding the day finishes it; the answer's
maximum is 366.

**Complexity:** `O(1)` time — a fixed slice-and-sum over 12 constants — and
`O(1)` space.
