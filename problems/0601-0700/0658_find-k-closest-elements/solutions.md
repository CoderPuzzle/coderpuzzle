# Solutions — Find K Closest Elements

## Binary Search on Window Start

Because `arr` is sorted, the k closest elements always form a contiguous block — if a closer element sat outside a chosen block, swapping it for the block's far end would improve it. So the task reduces to choosing the block's starting index, and the optimum is monotone: starts that are too far left must move right, starts too far right must move left. That monotonicity is what binary search exploits over the range `[0, n - k]`.

At a candidate start `mid`, the two elements that decide the outcome are `arr[mid]` at the window's left edge and `arr[mid + k]`, the first element just past the window. If `x - arr[mid] > arr[mid + k] - x`, the element being excluded on the right is strictly closer than the one being kept on the left, so this window (and every window starting further left) is beatable — search moves to `lo = mid + 1`. Otherwise the left element is at least as close, the window stays, and the search tightens toward earlier starts.

The tie rule falls out of the same comparison: when the distances are equal, the condition is false and `hi = mid` keeps the window with the smaller elements, which is exactly the problem's preference for the smaller value on equal distance. Note the asymmetry — the comparison uses the element just outside the window rather than the window's right end, correctly capturing a swap of the leftmost kept element for the first excluded one.

Each iteration halves the candidate start range, and the final answer is one slice of the array.

**Complexity:** `O(log(n - k))` time, `O(k)` space.
