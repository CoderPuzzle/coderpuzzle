# Solutions — Traffic Signal Color

The signal's state is a pure function of the remaining seconds: three disjoint
conditions each name one color, and everything else is "Invalid". Because the
conditions never overlap, they can be checked one after another in any order.

## Direct rule evaluation

Each rule maps to a simple comparison. `timer == 0` selects "Green", `timer ==
30` selects "Orange", and the double-sided comparison `30 < timer <= 90`
selects "Red". The tight `30 <` bound matters: `timer == 30` is the Orange
state, not the low end of the Red band, so the two conditions must be kept
separate.

Any value outside those cases — including every value below 0 (which the
constraints rule out) and above 90 up to the constraint ceiling of 1000 — falls
through to "Invalid". The whole decision needs constant time and no auxiliary
storage.

**Complexity:** `O(1)` time, `O(1)` space.
