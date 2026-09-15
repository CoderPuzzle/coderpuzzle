# Solutions — Mini Parser

## Single-pass stack parser

Scan the string once with an explicit stack of list holds. A `[` pushes a
fresh empty list; a `]` pops the finished list and appends it to the list
now on top of the stack — or, when the stack empties, records it as the
root. A run of digits (with an optional leading `-`) is parsed as one
integer and appended to the current top; commas are skipped. A string that
does not start with `[` is a lone integer, handled up front.

The explicit stack makes the parse iterative, so nesting depth costs heap,
not call stack — the `5 * 10⁴` length bound permits far deeper nesting than
any default recursion limit would survive.

**Complexity:** `O(n)` time for `n = s.length` (each character is examined
once), `O(d)` extra space for the stack where `d` is the bracket depth.
