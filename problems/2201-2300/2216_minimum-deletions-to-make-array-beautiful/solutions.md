# Solutions — Minimum Deletions to Make Array Beautiful

Deletions only shift the tail leftward, so any beautiful array reachable from
`nums` is a subsequence — and the greedy pairing order is preserved: element
positions in the kept array decide whether a neighbor constraint applies, and
keeping elements in arrival order never forfeits the optimum.

## One-pass greedy pairing

Scan `nums` while tracking how many elements are kept so far. An even slot
(the first of a pair) accepts anything, and an odd slot must differ from its
pair's first element — an arriving value that equals that pair head is the one
deleted. Each decision is final: keeping an equal pair would violate the
constraint at that exact parity, while dropping either member frees the next
arrival into an even slot again. If the scan ends on an odd count, one last
deletion removes that unpairable tail element.

Every step inspects at most the previous kept element, and counters stay below
the input length. Values fit comfortably in 32 bits per the constraints, and
the answer is bounded by `nums.length`, so plain integer arithmetic suffices
in all seven languages.

**Complexity:** `O(n)` time, `O(1)` space.
