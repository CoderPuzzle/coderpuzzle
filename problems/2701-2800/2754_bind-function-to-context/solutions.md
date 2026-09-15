# Solutions — Bind Function to Context

## Symbol-Keyed Method Attachment

The bound wrapper installs the function on the target object under a
freshly created symbol, calls it there, and removes it again. A method call
always makes its object the receiver, so invoking `fn` through `context`
delivers exactly the `this` binding real `bind` promises — and because a
symbol never collides with any existing property (string keys or other
symbols), the temporary slot neither clobbers state nor leaks between
calls. The `try`/`finally` guarantees the slot is removed even when the
invoked function throws.

No built-in appears anywhere past the language core itself: no
`Function.bind`, and — answering the statement's closing challenge — no
`apply` or `call` either; property installation plus a spread call carry
the arguments through. Each invocation costs one property install, the
underlying call, and one delete.

**Complexity:** `O(n)` time, `O(1)` space, where `n` is the number of
forwarded arguments.
