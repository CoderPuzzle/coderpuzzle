# Solutions — Majority Element

Every reading here stands on the same guarantee: one value occurs strictly
more than `⌊n / 2⌋` times, and no array can hold two values that both do.
The full sort turns that count into position — ordered by value, the
majority's occurrences form one run longer than half the array, and a run
that long must cover the middle, so the middle element is the answer. The
hash count takes the guarantee at face value and tallies it: one sweep
counts every distinct value, and the first tally to cross half the array
names the answer. Boyer-Moore voting spends the majority's occurrences
against one opposing value apiece on a single scan, until the candidate
left standing is the answer. The sort pays `O(n log n)` comparisons, the
count `O(n)` time and `O(n)` space, and the vote `O(n)` time in `O(1)`
space — the only one of the three that meets the follow-up's demand.

## Boyer-Moore voting

The scan keeps exactly one candidate and one counter. When the counter sits at zero the
current element is adopted as the new candidate; afterwards a match with the candidate
raises the counter and a mismatch spends it, so every element votes for or against a
single standing value. No table of counts is ever kept — the pair `(candidate, count)`
is the entire state, which is what the follow-up's `O(1)` space asks for.

Why the survivor is the majority: every mismatch cancels one occurrence of the candidate
against one occurrence of some other value, so each unit the counter drops stands for a
pair of elements deleted from consideration. Any stretch of the array in which the
majority element is the candidate can lose at most the minority elements it holds, and
any stretch in which it is not still deletes at least as many minority elements as
majority ones. Since the majority owns more than half of all elements, it cannot be
fully cancelled across the whole array, and the candidate left standing at the end is
it.

The code needs no second pass to confirm the winner because the statement guarantees a
majority element exists, and it initializes `candidate` with the first element purely so
the zero-counter swap on the very first step is harmless — adopting `nums[0]` when the
count is zero is exactly what the loop does anyway.

**Complexity:** `O(n)` time, `O(1)` space.

## Hash Count

The direct reading of the premise: the answer turns up more than `n / 2`
times, so keep one tally per value and stop the moment a tally crosses half
the array. That early exit is safe because no value can be overtaken after
it — two values cannot both hold more than half the positions — and because
a majority is promised, some tally always does cross.

One sweep builds the table and usually ends it early; `[5,8,8,2,8,6,8]` is
out the door as soon as the fourth `8` lands. This is the linear-time,
linear-space answer the statement's follow-up names: the table holds at most
one entry per distinct value, and nothing about the values themselves —
sign, spread, order — matters to it.

**Complexity:** `O(n)` time, `O(n)` space.

## Sorting

A majority is a statement about counts, but sorting turns it into a
statement about position. Sort a copy and the majority's occurrences stand
together as one run; that run is longer than half the array, and a run that
long cannot sit anywhere except over the centre — its first entry lies at or
before the halfway index, its last at or after. Whichever value occupies the
middle of the sorted array is therefore the majority, whatever order the
input arrived in.

That is the entire algorithm: sort, read index `n / 2` (fractional part
discarded), return it. A single-element array is sorted trivially and its
only element is the middle. All the work is the sort itself; the answer is
one subscript.

**Complexity:** `O(n log n)` time, `O(n)` space for the sorted copy.
