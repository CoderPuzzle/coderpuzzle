# Solutions — Remove K Digits

## Monotonic stack

The result keeps `len(num) - k` digits in their original relative order, and the smallest such number is built greedily left to right: whenever a kept digit is larger than the digit arriving next, removing that kept digit always helps, because a smaller digit in a more significant position outweighs anything lost later. The stack maintains exactly this: it is kept non-decreasing while removals remain, popping the top (spending one removal) whenever `stack[-1] > ch`.

Each digit is pushed exactly once and popped at most once, so the whole scan is linear in the input length. Two situations need care after the scan. If `k` removals are still unspent — which happens whenever the digits are non-decreasing, like `12345` — the leftovers must be dropped from the _end_ of the stack, where the largest digits sit, via `stack[:-k]`. And leading zeros produced by the greedy (for example removing the `1` from `10200`) are stripped with `lstrip("0")`, with the empty result mapped to `"0"` so a fully consumed input like `"10"` with `k = 2` returns `"0"` rather than `""`.

The greedy is exchange-argument safe: any optimal answer agreeing with the stack on a prefix but keeping a larger digit where the algorithm removed one can be improved digit by digit, so the stack construction is optimal at every step. The input can be up to 10^5 characters, which rules out any approach that tries all removal choices.

**Complexity:** `O(n)` time, `O(n)` space.
