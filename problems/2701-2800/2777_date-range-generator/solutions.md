# Solutions — Date Range Generator

## UTC-Millisecond Stepper

Parse both endpoints into UTC-midnight milliseconds with `Date.UTC` over
the raw `YYYY-MM-DD` components, then loop: while the current instant has
not passed `end`, yield the current date formatted from the UTC getters
(year plus two-digit month and day) and advance by
`step * 86400000` milliseconds. Staying entirely in UTC-millisecond
arithmetic is what makes this immune to the host's timezone. A string like
`"2023-03-12"` handed to `new Date(string)` is already midnight UTC, but
rendering that `Date` through the local getters (`getMonth`, `getDate`)
shifts the visible day near DST transitions and month edges; reading back
`getUTCFullYear`/`getUTCMonth`/`getUTCDate` over pure UTC steps always
reports exactly the calendar day the loop advanced to, on any machine.

Because every step moves whole days across UTC midnights, no calendar
logic is needed at all: the millisecond counter crosses Jan 31 to Feb 1,
Feb 28 to Mar 1 (leap year or not), and Dec 31 to Jan 1 with no special
cases, and the inclusive end falls straight out of the `<=` comparison.
Each `.next()` does constant work, so driving all yields costs time linear
in their count with constant auxiliary space beyond the emitted strings.

**Complexity:** `O(n)` time, `O(1)` space, where `n` is the number of
yielded dates.
