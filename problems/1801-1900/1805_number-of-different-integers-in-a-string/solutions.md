# Solutions — Number of Different Integers in a String

Splitting `word` into its maximal digit runs is the whole parsing job; what
remains is counting distinct integer values among them. A run can be up to
1000 digits long, far beyond any fixed-width integer type, so the values are
never parsed to numbers at all: each run is stripped of leading zeros and
compared as a normalized string.

## Collect normalized digit runs in a hash set

Scan `word` once with an index, skipping letters. On meeting a digit, advance
a second index to the end of the maximal digit run, then slide a third index
past the run's leading zeros while at least one digit remains, so `"001"`
reduces to `"1"` and an all-zero run such as `"000"` reduces to `"0"`. The
normalized slice goes into a hash set of strings, which absorbs duplicates
exactly as the comparison rule demands: two integers are different precisely
when their zero-stripped decimal representations differ. The answer is the
set's size.

On `"a123bc34d8ef34"` the runs normalize to `123`, `34`, `8`, `34`, and the
set keeps three of them. On `"a1b01c001"` every run normalizes to `"1"`,
leaving a single integer.

**Complexity:** `O(n)` time, `O(n)` space.
