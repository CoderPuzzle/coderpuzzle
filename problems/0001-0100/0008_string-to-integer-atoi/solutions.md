# Solutions — String to Integer (atoi)

## One-pass state machine with early clamping

The statement already prescribes the algorithm, so the solution is a single left-to-right scan whose cursor moves through three states: leading spaces are skipped, one optional sign character is consumed, and the following run of digits is accumulated. The first character that does not fit the current state — a letter, an inner space, a `.`, or a second sign — ends parsing, and whatever has been accumulated is returned. If no digits were read at all the total is still its initial zero, which is exactly the "no digits" rule.

Clamping happens during accumulation, not after it. Before appending the next digit the code checks whether `total * 10 + digit` would pass 2³¹ - 1; if it would, the value is out of range and the method returns the boundary in the sign's direction immediately, `2147483647` or `-2147483648`. Checking before extending also bounds the accumulator to 2³¹ - 1 from that point on, so a run of up to 200 digits can never overflow the 64-bit intermediate — a check postponed to the end would wrap on inputs like two hundred nines. The magnitude bound is `2147483647` for both signs, and the only value this rejects early for a negative sign is -2147483648 itself, which is precisely what the clamp returns, so the early exit stays exact.

Digits are recognized by the ASCII range `'0'`–`'9'` rather than by the languages' broader digit classifiers, and sign handling accepts at most one `'+'`/`'-'`, which is what makes inputs like `"+-"`, `"0-1"`, and `"  -88827   545-  "` come out as 0, 0, and -88827 respectively.

**Complexity:** `O(n)` time, `O(1)` space.
