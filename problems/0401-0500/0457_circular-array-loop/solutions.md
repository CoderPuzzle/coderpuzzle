# Solutions — Circular Array Loop

## One walk per start, dead ends remembered

Treat `nums` as a functional graph: every index has exactly one successor, the index `nums[i]` steps forward or backward with the array wrapping, so a walk from any start either closes a loop or runs out of array to discover. Not every closed loop counts — the statement demands one direction on every hop and a length greater than one — so a walk is really testing two things at once: where it ends up, and whether the path there stayed legal.

The walk stamps each index it touches as on-the-current-path and takes one hop at a time. A hop is refused the moment it would break the rules: landing on an index whose value has the opposite sign, or hopping straight back to the index itself (a loop of length one). Those refusals are the only two dead ends, and arriving back at an index already stamped by this same walk closes a loop that is all one direction and at least two long — exactly the cycle the statement asks for. A walk that dies instead retires every index on its path as proven guilty: each of them flows into the same dead end, so no later start needs to walk them again.

Retiring is what makes the whole scan linear. The two nested loops look quadratic, but each index is stamped by at most one walk's inner loop before it is retired or the answer is out, so the total work across all starts is proportional to the array length. The cost is a separate state array next to the input — `O(n)` extra memory as shipped; the follow-up's `O(1)` variant would instead overwrite walked entries of `nums` itself with a sentinel.

**Complexity:** `O(n)` time, `O(n)` space.
