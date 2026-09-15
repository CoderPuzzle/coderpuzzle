# Solutions — Card Flipping Game

## The always-showing set

Which numbers can ever be good? A card printed with the same number on both faces has no choice: flipped or not, that number is facing up, so it can never be good. Every other printed number can be. To make `v` good, rest one card carrying `v` with that side down, and orient each remaining card to hide `v` — a card whose two faces differ shows `v` on at most one of them, so a hiding orientation always exists. Flips are free and per-card independent, so these choices never conflict, and nothing about the arrangement needs to be searched.

The algorithm follows directly: collect the numbers that some both-faces card always shows, then walk every number printed on any card (both arrays) and keep the smallest one outside that set. The answer is `0` exactly when every printed number is forced — the both-faces cards cover them all.

A hash set answers each membership test in constant time; the running best absorbs the minimum on the fly, and `0` doubles as the "no candidate yet" mark since every printed number is positive.

**Complexity:** `O(n)` time, `O(n)` space.
