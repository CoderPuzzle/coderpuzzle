# Solutions — Number of Days in a Month

## Month table plus the Gregorian leap rule

Eleven of the twelve months never change, so their lengths come straight
from a lookup: 31 days for months 1, 3, 5, 7, 8, 10, 12 and 30 for 4, 6, 9, 11. Only February varies, and it varies by exactly one day, so the whole
answer reduces to one boolean — is this a leap year?

The Gregorian rule has three clauses: a year divisible by 4 is a leap year,
unless it is also divisible by 100, unless it is also divisible by 400.
Written as a single expression that is `year % 4 == 0 && (year % 100 != 0
|| year % 400 == 0)`. The constraint range 1583–2100 (the Gregorian era) is
exactly the range in which this rule is the law, and it makes the classic
trap years come out right: 1900 is not a leap year (divisible by 100, not by 400) while 2000 is (divisible by 400).

February returns 29 in the leap case and 28 otherwise; every other month
returns its table entry untouched.

**Complexity:** `O(1)` time and space — a handful of integer divisions and
one table of twelve constants.
