# Solutions — Final Prices With a Special Discount in a Shop

## Monotonic Stack of Pending Discounts

For each item the discount is the first later price that is less than or equal to it — a textbook next-smaller-or-equal-element query. A brute-force forward scan per item fits the small limits, but a single left-to-right pass with a stack resolves every item in total linear time.

The stack holds indices whose discounts are still undetermined, and its prices are kept strictly increasing from bottom to top. When the scan reaches a new price, every pending index whose price is at least the current one has just met its discount: the current item is the nearest later index satisfying the condition, because any index between it and the stack top was already popped by some equal-or-cheaper price seen earlier. Those indices are popped and their answers reduced by the current price; the current index is then pushed to await its own discount.

The answer array starts as a copy of the prices, so items that never get popped keep their full price. The pop comparison is non-strict on purpose: an equal price does grant the discount, which is why an item of the same price resolves its predecessor and then itself waits for something cheaper or equal. Each index is pushed once and popped at most once, so the whole pass is linear despite the nested loop.

**Complexity:** `O(n)` time, `O(n)` space.
