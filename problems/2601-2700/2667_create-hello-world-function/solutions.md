# Solutions — Create Hello World Function

Nothing varies between calls: the argument lists, however shaped, never
influence what the function should answer.

## Return a constant-carrying closure

`createHelloWorld` itself performs no work beyond allocating the one
function it must return. That inner function closes over nothing but the
string literal and its body is a single expression: it spreads past
whatever arguments arrive (`...args` collects them, unused) and answers
"Hello World". Because no state is captured, replays of any row — empty
lists, objects, nulls, nested arrays — all read back the identical
string, which is exactly the contract.

The triviality is the point of this problem: recognizing that a factory
returning a closure with a constant body needs no bookkeeping at all, not
even a counter or cache, as long as arguments are accepted and ignored.

**Complexity:** `O(1)` time per returned-function call, `O(1)` space per
factory instance.
