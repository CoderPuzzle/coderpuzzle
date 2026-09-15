# Solutions — Final Value of Variable After Performing Operations

## Inspect the operator

Start the variable at zero and process the operations in order. All four valid strings have their operator in the middle: a `+` means the value increases by one, while a `-` means it decreases by one. Whether the operator appears before or after `X` does not change the result.

The scan therefore needs only one running integer. For each string, inspect its middle character and add either `1` or `-1`; the final accumulated value is the answer.

**Complexity:** `O(n)` time, `O(1)` auxiliary space.
