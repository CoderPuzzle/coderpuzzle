# Solutions — Sum of Digits of String After Convert

The result is produced by simulating the convert-and-sum process, keeping
the concatenated value as a digit string so it never overflows.

## Concatenate the positions, then simulate the digit sums

The conversion step maps each letter to its 1..26 alphabet position and
concatenates the written forms, so `"zbax"` becomes the digit string
`"262124"`. The transformed value after one pass is exactly the sum of the
digits of that string, and repeating the pass `k` times reproduces the
process the statement describes.

The key bookkeeping choice is to keep the concatenated value as a string
rather than a number. `s.length` reaches 100 and a position has up to two
digits, so the full concatenation can be 200 digits long — far beyond any
fixed-width integer in the target languages, and JavaScript's exact
`2^53` range. Because every later stage only reads the value's digits, the
string form is the natural representation, and after the first transform
the total is at most `200 * 9 = 1800`, after which the remaining `k - 1`
transforms shrink it to a single digit almost immediately.

Each transform scans the current digit string once, builds the sum, and
replaces the string with the sum's decimal form. The loops run `k` times
with `k <= 10`, and the digit count collapses from 200 to at most four
digits on the first transform, so the work is dominated by that first scan.

**Complexity:** `O(n * k)` time, `O(n)` space, where `n` is the length of
`s` (the concatenation holds up to `2n` digits).
