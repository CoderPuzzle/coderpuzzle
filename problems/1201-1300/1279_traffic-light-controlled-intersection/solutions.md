# Solutions — Traffic Light Controlled Intersection

## A light state under one lock

The intersection's whole rule is one bit — which road is green — plus the
requirement that the light only change when the road actually changes. Holding
one lock across each arrival makes both trivially true: the arriving car reads
the green road, flips the light (calling `turnGreen` first, so the light is
green before anything crosses) exactly when its own road differs, and then
crosses — all while no other arrival can interleave. Road A starts green, so
the first cars of road A cross without touching the light, and the first road
B car is the one that switches it.

No thread ever waits for anything but the lock, so no arrival order can
deadlock: whatever car holds the lock finishes its crossing and releases it.
Cars on the same road pass through back to back — the lock is only held for
the length of one crossing — and cars on the other road queue behind the
state they are about to switch.

**Complexity:** `O(1)` work per car — one lock acquire, at most one light
switch, one crossing — with `O(1)` space for the lock and the green-road bit.
