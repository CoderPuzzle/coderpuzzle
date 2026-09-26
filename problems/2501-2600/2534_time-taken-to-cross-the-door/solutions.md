# Solutions — Time Taken to Cross the Door

Arrival times are non-decreasing, so feeding two first-in-first-out queues
from a single arrival pointer preserves the smallest-index tiebreak for
free: everybody waiting on one side is crossed strictly in index order. The
whole simulation then reduces to one question per second — which direction
does the door serve?

## Two-queue sweep with direction streaks

Each step admits everyone arrived by the current second, then picks a side:
when only one queue has people, that side goes; when both compete, the door
continues whichever direction it used in the previous second, and if the
door stood unused (including after an idle gap, where the clock jumps ahead)
exiting wins as the default. The crossing writes `answer[person] = t`, and
the chosen side becomes the streak's new direction. When nobody waits the
clock jumps straight to the next arrival — that jump also resets the
direction memory, exactly matching "not used in the previous second".

![On arrival = [0,1,1,2,4] with state = [0,1,0,0,1] the entry streak from t = 0 keeps the door on enter through t = 2, so exiting person 1 waits until t = 3 and the answer is [0,3,1,2,4].](figures/solution-door-direction-streak.svg)

Every person is enqueued once, dequeued once, and each second either crosses
someone or advances the arrival pointer, giving linear work plus no sorting.
Answer values are bounded by `max(arrival) + n ≤ 2·10⁵`, well inside 32-bit.

**Complexity:** `O(n)` time, `O(n)` space.
