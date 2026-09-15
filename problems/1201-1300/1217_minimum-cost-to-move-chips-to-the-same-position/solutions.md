# Solutions — Minimum Cost to Move Chips to The Same Position

## Count the two parities and pay the smaller side

A ±2 move is free, so any chip can slide arbitrarily far along the positions
of its own parity at zero cost — distance never matters, only parity does.
The only paid move is ±1, and its sole effect is to flip a chip's parity.
So moving everything to one common position means choosing a target parity and
paying one unit for each chip that starts on the other one.

Count how many positions are even and how many are odd. Gathering everyone on
an even target costs the number of odd chips; gathering on an odd target costs
the number of even chips. The answer is the smaller of those two counts.

**Complexity:** `O(n)` time, `O(1)` space.
