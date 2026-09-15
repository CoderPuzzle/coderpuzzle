# Solutions — Logger Rate Limiter

## Next-allowed timestamp per message

The structure is a single hash map from message to the next timestamp that
message may print at. A `shouldPrintMessage` call looks its message up: if an
entry exists and `timestamp` is still below it, the call arrived inside the
ten-second shadow of an earlier print and returns `false`; otherwise the
message prints and the entry moves to `timestamp + 10`. Nothing else is kept —
no queue of recent prints, no timestamps for messages that never printed.

The boundary comparison is the exact one the example pins down: `11 >= 11`
prints again while `10 < 11` does not, so "at most every 10 seconds" means a
message printed at `t` is blocked strictly before `t + 10` and allowed from
`t + 10` on. Because timestamps arrive in non-decreasing order, an entry is
never observed by an earlier arrival than the one that wrote it, so there is
no invalidation case to handle; a brand-new message simply has no entry,
which reads as "allowed", and its first print creates one.

Entries are never removed: a message printed once holds its slot even if it
never appears again. That is the deliberate space trade. With at most `10⁴`
calls there are at most `10⁴` distinct messages, so the map stays small, while
the cleanup alternative — dropping stale entries, say through a queue of
pending expirations — buys nothing: every query asks about one message's
boundary, which the map answers in constant time however old the entry is.

**Complexity:** `O(1)` time per `shouldPrintMessage` call; `O(D)` space for
the `D` distinct messages seen.
