# Solutions — Return Length of Arguments Passed

The judged quantity is call arity: however many values a case spreads into
`argumentsLength`, answer with their number. Both offered languages expose
the engine's own parameter bookkeeping directly, so each implementation is
a one-expression read rather than any kind of scan.

## Arity Read at Call Time

In JavaScript, every invocation of a plain (non-arrow) function creates an
implicit `arguments` object listing exactly what that call received, and
its `.length` is the requested count — values may be numbers, strings,
objects, or absent altogether (`argumentsLength()` still sees an empty
argument list of length 0). Declaring `function argumentsLength() { return
arguments.length; }` therefore outsources all the work to machinery the
runtime already maintains per call, and the harness's spread dispatch
`argumentsLength(...argsCase.args)` reproduces LeetCode's variadic driving
faithfully, including the empty spread that must yield 0.

TypeScript expresses the same fact with its own construct: a rest
parameter declares the function variadic at the type level, and the engine
materializes one array holding the positional arguments delivered on each
call — `function argumentsLength(...args) { return args.length; }`. The
array is built during argument passing itself, so again nothing is counted
by author code; the read is a constant-time property access in both
languages.

Edges fall out identically in both forms because position, not value,
decides membership: duplicate literals occupy distinct positional slots
and each counts; composite arguments (objects, arrays, including deeply
nested ones) are single slots no matter how large their interior;
empty-string/empty-object/empty-array payloads still count as present;
and repeating the identical call re-reads a fresh record, so counts are
stable across invocations.

**Complexity:** `O(1)` time, `O(1)` space.
