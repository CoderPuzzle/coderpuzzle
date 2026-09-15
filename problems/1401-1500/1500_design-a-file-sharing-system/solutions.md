# Solutions

The design space splits along the same line as the hints: index chunks by
owner, or owners by chunk. The presented solution indexes users and their
chunk sets, with a min-heap (backed by a free set) handing out the
smallest reusable id. The alternative — a per-chunk list of owners kept
incrementally in sorted order — answers requests without scanning but
makes join/leave bookkeeping heavier; with at most 10⁴ calls both sit far
under the limits.

## User Table With Reusable-ID Min-Heap

Keep `chunks[user]`, the set of chunk ids that user owns; `alive`, the
set of current user ids; and a min-heap of freed ids. `join` pops the
smallest freed id if one exists, otherwise takes `next` (one past every
id ever handed out), registers the new user's chunks, and returns it.
`leave` removes the user's set entirely and pushes their id onto the
heap. `request` scans `alive`, collects the ids whose sets contain
`chunkID`, sorts them, and — when the list is non-empty — adds the
requested chunk to the requester's own set so later calls see it. Each
call does work proportional to its own inputs: `join` touches at most 100
chunks, `request` scans the active population once plus a sort.

**Complexity:** `join` is `O(|ownedChunks|)`; `leave` amortized
`O(1)`; `request` is `O(users + result log result)`. Space `O(total
owned chunks + users)`.
