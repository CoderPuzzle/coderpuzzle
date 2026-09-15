# Solutions — Add Two Promises

## Await Both Inputs Together

Combine the two input promises with `Promise.all([promise1, promise2])`
and resolve the result with the sum of the two settled values,
destructured in one `.then(([a, b]) => a + b)` callback. The key property
is that `Promise.all` subscribes to both promises the instant it is
called, so the two settlements remain concurrent: whichever promise is
slower can never starve the other's handler, and the combined promise
resolves precisely when both inputs have resolved — Example 1's 20 ms and
60 ms timers land at their own pace, while only the slower one gates when
`7` is produced.

The problem judges only what the returned promise resolves with — its own
resolution time is explicitly not judged — so no bookkeeping about order
or latency is needed beyond waiting for both inputs. Because each input
resolves with a number by the problem's guarantee, `Promise.all`'s
aggregate never rejects for a correct submission; the two numbers arrive
in argument order (`[a, b]` mirrors `[promise1, promise2]`) even though
their settlement order may differ, and the addition runs once both are in
hand.

**Complexity:** `O(1)` time (two promise subscriptions and one addition),
`O(1)` space.
