# Solutions — Web Crawler

## Breadth-first crawl over one hostname

The crawler is a graph reachability search in disguise: pages are nodes,
`getUrls` reveals a node's out-edges, and the crawl must cover exactly the
pages reachable from `startUrl` through links that never leave `startUrl`'s
hostname. Extracting that hostname is the first cut: everything between
`http://` and the next `/`.

A queue seeded with `startUrl` drives the walk. Each dequeued page is fetched
through `getUrls`; a discovered link joins the queue only when its hostname
matches **and** it has not been seen — the seen-set is marked at enqueue
time, not dequeue time, which is what keeps the same page from being queued
twice and keeps `getUrls` from ever being called twice on one url, exactly as
the rules demand.

Links to other hostnames are dropped the moment they are seen: they are
neither fetched nor expanded, so a foreign site's subtree — reachable only
through that page — never enters the crawl.

The judged artifact is the crawl itself: the parser records every page whose
`getUrls` was called, and that recorded set is compared (order-insensitively)
against the expected same-hostname reachable set. A crawl is right exactly
when it fetches precisely those pages — fetching nothing else (no foreign
hostnames, no unreferenced urls) and missing nothing.

**Complexity:** `O(U + E)` time for `U` urls and `E` edges (each page fetched
once, each link inspected once), `O(U)` space.
