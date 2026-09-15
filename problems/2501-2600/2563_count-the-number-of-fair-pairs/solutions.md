# Solutions — Count the Number of Fair Pairs

## Sorted two-pointer window difference

Fairness never consults the original indexes — only values matter and the
pair count treats `(i, j)` with `i < j` as a single unordered choice. So
sort first: scanning ordered positions of the sorted array counts every
original pair exactly once. With hint 3's monotonicity in hand, define one
helper that counts pairs whose sum is at most `limit`; the fair-pair total
is then simply its value at `upper` minus its value at `lower - 1`.

The helper itself is a sliding window rather than a binary search per
element: keep one pointer at the small end and one at the big end of the
sorted copy. Whenever the endpoint sum fits under `limit`, moving forward
would only shrink the eligible partner range, so the current small element
pairs with everything between the pointers — worth exactly `hi - lo` — and
the left pointer advances; otherwise the right pointer retreats. Each
window sweep is linear after the sort, doing in one pass what hint 2
achieves with `n` searches.

The arithmetic width is where care lives: elements reach `±10⁹`, so pair
sums touch `±2 · 10⁹`, overflowing 32-bit math before any comparison;
answers reach `C(10⁵, 2) ≈ 5 · 10⁹`, beyond an `int` return as well. Java,
C++, Go and Rust therefore widen sums and counts to 64-bit; JavaScript
Numbers stay exact because even `5 · 10⁹ ≪ 2⁵³`.

**Complexity:** `O(n log n)` time, `O(n)` space (for the sorted copy).
