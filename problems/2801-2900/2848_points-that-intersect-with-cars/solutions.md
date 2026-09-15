# Solutions — Points That Intersect With Cars

## Sort cars by start point, sweep the union

Sorting the cars by their starting points lines them up along the number
line, so a single pass can settle every overlap as it is met: any part of
the current car that sits at or before the rightmost integer point already
counted belongs to spans seen earlier and must not be paid for again.
Carrying that rightmost covered point as `reach`, a car whose end does not
exceed it is contained in already-counted spans and adds nothing; otherwise
only its fresh suffix counts, running from wherever the car starts — or from
`reach + 1`, when it begins inside an earlier span — through its own end,
which then becomes the new `reach`.

Merely touching cars behave correctly without special cases: for `[1,5]`
followed by `[5,10]`, the second car's fresh suffix starts at
`reach + 1 = 6`, so the shared endpoint 5 is never counted twice while the
two spans stay one continuous run.
Duplicates and nested cars simply leave `reach` where it was and contribute
zero. With every coordinate bounded by 100, the answer never exceeds 100
whatever the stacking of up to 100 cars.

**Complexity:** `O(n log n)` time, `O(1)` extra space.
