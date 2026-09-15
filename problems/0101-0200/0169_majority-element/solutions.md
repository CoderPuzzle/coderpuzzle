# Solutions — Majority Element

Three routes to the same value, each leaning on the premise — more than half
the positions hold the answer — in its own way. The sort leans on it
geometrically: the majority's occurrences form one run longer than half the
array, and any run that long must cover the middle of any ordering, so the
middle of a sorted copy is the answer. The hash count takes it literally
and tallies every value until one tally crosses half. Boyer-Moore turns it
into arithmetic, cancelling majority votes against opposition on a single
sweep until a survivor is all that stands. A sort buys the shortest code, a
table buys a one-pass answer, and Boyer-Moore meets the follow-up's
challenge of linear time and constant space at once.

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

## Boyer-Moore Voting

The key insight is that the majority element appears more than `n/2` times, so it outnumbers every other element combined. If you pair up each occurrence of the majority element with one occurrence of any different element, the pairs cancel out and at least one unpaired majority vote survives. This means a single pass with a running "vote count" can identify the majority without ever counting occurrences explicitly.

The algorithm keeps a `candidate` and a `count`. When the count reaches zero, the current element is adopted as the new candidate with count 1. Thereafter, each element equal to the candidate increments the count and each different element decrements it. Every decrement can be viewed as cancelling one candidate vote against one opposing vote, so segments where the count returns to zero are self-cancelling and cannot contain more than half of any true majority.

Because the problem guarantees a majority element exists, the surplus it accumulates over the entire array ensures the candidate left standing at the end is that majority element — no verification pass is needed. A single-element array simply adopts its only element on the first iteration, and the answer is returned as soon as the loop finishes.

**Complexity:** `O(n)` time, `O(1)` space.
