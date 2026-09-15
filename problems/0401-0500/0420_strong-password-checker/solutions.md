# Solutions — Strong Password Checker

## One greedy pass per length regime

Which operations are even available is decided by length alone: under 6 the password must grow, over 20 it must shrink, in between its length is already legal. Under 6 the answer is simply `max(6 - n, missing)` — every insert approaches the length floor and, dropped inside the one run that can exist at that size, breaks it while carrying a missing class, so the run condition never adds to the bill. Between 6 and 20 it is `max(missing, sum(len // 3))` over the runs of length at least 3: a run of length `len` is settled by replacing every third character, `len // 3` replaces, and no single operation can settle more than one replace's worth of run. Over 20, `n - 20` deletions are unavoidable, and the answer is those deletions plus `max(missing, replaces)` after spending them where they retire the most replaces.

Replacing every third character of a run does two jobs at once: the new characters cut the run into pieces of at most two, and each can be the lowercase, uppercase, or digit the password is missing. That is why the mid regime is a `max` rather than a sum — the very replace that shortens a run can be the step that introduces a class, so the two bills overlap instead of stacking. Deletions enjoy no such doubling: they can never introduce a class, which is why in the over-length regime the class deficit is paid alongside the mandatory deletions rather than absorbed by them.

A deletion retires a replace only when it pushes a run's length below a multiple of 3 — from 6 to 5 one deletion saves a replace, while from 7 to 6 or 8 to 7 it saves nothing. So the deletion budget goes to runs sitting exactly on a multiple of 3 first (one deletion each), then to runs of length ≡ 1 (two deletions), then ≡ 2 (three); afterwards every run sits at ≡ 2, and any budget still in hand retires further replaces at three deletions apiece, never past zero. Spending cheapest-first is optimal because a run's saves get monotonically dearer — its first costs its remainder plus one, every later one costs three.

**Complexity:** `O(n)` time, `O(1)` space.
