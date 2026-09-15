# Solutions — Keys and Rooms

## Iterative flood of the key graph from room 0

Rooms are nodes and keys are one-way edges — `rooms[i]` lists every node with
an edge from `i` — so the rooms that can ever be entered are exactly the nodes
reachable from room 0, the one room that starts unlocked. That turns the
puzzle into plain reachability: flood outward from room 0, pick up every key
found along the way, and answer whether the flood covers all `n` rooms.

An explicit stack drives the flood. Room 0 is marked and pushed; each popped
room offers its keys, and every key to an unmarked room marks and pushes that
room. Marking at the moment a room is scheduled — not when it is popped — is
what keeps each room on the stack at most once, so cycles, self-keys, and
duplicates of already-open rooms are absorbed without looping. A count of
marked rooms, compared against `n` once the stack drains, settles the answer.

Every room enters the stack at most once, and reading each room's key list
once per visit charges every key examination to a single entry, so the flood
is linear in the input; the mark array and the stack hold at most one entry
per room.

**Complexity:** `O(V + E)` time, `O(V)` space.
