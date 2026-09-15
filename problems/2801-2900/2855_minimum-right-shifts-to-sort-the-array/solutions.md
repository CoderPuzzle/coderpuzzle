# Solutions — Minimum Right Shifts to Sort the Array

## Count Rotation Breaks

Sorting nums with right shifts alone is possible exactly when nums is a
rotation of its sorted order, and with distinct elements that shape has a
local signature: walking the circular array, the values must ascend
everywhere except at exactly one place, the pivot where the largest
element is followed by the smallest. So count the positions i (cyclically,
including n - 1 back to 0) where nums[i] > nums[(i + 1) % n]. Zero
descents means nums is already sorted and the answer is 0; more than one
descent cannot be fixed by any rotation, so the answer is -1.

With exactly one descent at index k — nums[k] > nums[k + 1] — the sorted
target is nums[k + 1], ..., nums[n - 1], nums[0], ..., nums[k]. A right
shift moves every element one position forward, so shifting s times puts
the original element at index (i - s) mod n into slot i; the first sorted
element nums[k + 1] must land at slot 0, which takes
(k + 1) steps from index k + 1, i.e. the answer is n - 1 - k. All values
are at most 100 and n at most 100, so everything fits comfortably in a
signed 32-bit int.

**Complexity:** `O(n)` time, `O(1)` space.
