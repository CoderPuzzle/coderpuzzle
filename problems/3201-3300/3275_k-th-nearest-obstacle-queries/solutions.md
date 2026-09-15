# Solutions — K-th Nearest Obstacle Queries

The obstacle set only ever grows, and each query asks for the kth smallest
distance among all obstacles seen so far. Rescanning or re-sorting every
distance after each insertion would repeat enormous amounts of work — and
nearly all of it is wasted, because only the k nearest obstacles can ever
be reported. Keeping just those k candidates is enough to answer every
query exactly.

## Bounded max-heap of size k

Maintain a max-heap that holds at most k distances: after processing i
queries it contains exactly the k smallest distances inserted so far (or
all of them when fewer than k exist). For each new obstacle compute its
distance `|x| + |y|`. While the heap holds fewer than k entries, the new
distance simply enters. Otherwise compare it with the heap's maximum — the
current kth smallest: if the newcomer is smaller it replaces that maximum,
and if it equals or exceeds it nothing changes. The reported answer is -1
while the heap has fewer than k entries, and the heap's maximum once it is
full.

The invariant survives every insertion because a multiset only gains
elements: if the newcomer belongs among the k smallest, exactly one previous
member — the largest — must leave, and that member is precisely the heap's
top; if it does not belong, it is at least as large as every retained
distance and the set stays untouched in content and order. Evicting large
distances is therefore safe for all future queries too: later insertions can
only push the kth smallest upward, never downward, so a discarded distance —
no smaller than the kth smallest at its eviction — can never fall back into
the k nearest. The heap top is thus always the true kth nearest distance.

Each of the q queries performs O(1) heap operations, each costing O(log k),
so the whole stream is processed in time proportional to `q log k` with the
heap never exceeding k entries.

**Complexity:** `O(q log k)` time, `O(k)` space.
