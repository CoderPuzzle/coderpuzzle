# Solutions — Call Function with Custom Context

## Symbol-Keyed Method Attachment

callPolyfill installs the function on the context object under a freshly
created symbol, invokes it there, and removes it again. A method call always
makes its object the receiver, so executing `fn` through `context` delivers
exactly the `this` binding the problem asks for, with the remaining
arguments spread straight into the call. Because a symbol never collides
with any existing property (string keys or other symbols), the temporary
slot neither clobbers the object's state nor leaks between calls, and the
`try`/`finally` guarantees the slot is removed even when the invoked
function throws.

No built-in appears anywhere past the language core itself: the statement
bans `Function.call`, and this answer also steers clear of `apply` and
`bind` — property installation plus a spread call carry both the context
and the arguments through. The enhancement is a single assignment to
`Function.prototype.callPolyfill`, so every function gains the method at
once — including functions the judged function builds itself before calling
`callPolyfill` on them. Aside from handing the caller's argument list over,
each invocation performs a fixed handful of operations: one property
install, the underlying call, one delete.

**Complexity:** `O(1)` time, `O(1)` space.
