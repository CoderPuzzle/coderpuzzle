# Solutions — Web Crawler Multithreaded

## A worker pool sharing one claim table

`getUrls` is a blocking call — on the real problem each fetch waits on an
HTTP round trip — so the win comes from having many fetches in flight at
once. The structure that makes that safe is a shared claim table: a set,
guarded by one lock, that records every URL already discovered. A worker
takes a URL from the work queue, fetches it, and for each outgoing link tries
to claim it — `claim(link)` returns true only for the first thread to see it
— and each successfully claimed link is queued for a future fetch.

The claim-then-queue order is the entire correctness argument. A URL is
enqueued at most once (only its claimer enqueues it), so no page is fetched
twice; a foreign-hostname link is dropped before claiming, so the crawl never
leaves the start hostname; and a page that reaches the queue is by
construction reachable from `startUrl` through same-hostname links.

Termination uses the classic outstanding-work counter: it rises when a URL is
enqueued and falls when its fetch completes, and the pool stops the moment it
returns to zero — every discovered page has then been fetched.

The judged artifact is the crawl itself: the parser records every page whose
`getUrls` was called, and that recorded set is compared (order-insensitively)
with the expected same-hostname reachable set. Whether the fetches were
issued by one thread or fifty, that set is identical.

**Complexity:** `O(U + E)` total work for `U` URLs and `E` edges — the wall
clock shrinks with the pool width, the work does not — and `O(U)` space.
