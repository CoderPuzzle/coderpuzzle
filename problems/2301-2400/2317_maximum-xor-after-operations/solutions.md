# Solutions — Maximum XOR After Operations

## Or of all elements

The operation can only clear bits. At any bit where `nums[i]` is 0, the factor `(nums[i] XOR x)` may be 0 or 1 there, but ANDing with 0 keeps it 0 — so `nums[i] AND (nums[i] XOR x)` is always a submask of `nums[i]`, no matter what `x` is. No operation ever creates a bit that no element started with, so every reachable state has all its bits inside the OR of the original array, which caps the final XOR at that OR.

The cap is reachable because each element can become exactly any submask of itself in one step: for a target submask `m ⊆ nums[i]`, pick `x = nums[i] XOR m`; then `nums[i] XOR x = m` and the AND passes `m` through unchanged. A result bit is set precisely when an odd number of elements keep it, so for every bit present somewhere we keep one witness copy and clear all other copies; bits absent everywhere stay absent. Every bit of the OR therefore survives, and nothing beyond it can — the answer is simply the OR of all elements.

**Complexity:** `O(n)` time and `O(1)` space.
