# Solutions

## Persistent four-character carry

Unlike a one-shot read, a request may end in the middle of a four-character block, and the unread remainder must survive until the next request — so the scratch block and a cursor into it live in the solution object, not inside one call. Per request, copy characters out of the leftover block first; only when the cursor reaches the block's end refill it with one `read4(buf4)` call, and stop the request on a 0 (end of file) with nothing more ever becoming readable.

Each request writes its characters into `buf` continuing at the running offset left by the earlier requests, and contributes `min(n, remaining)` to the running total, which the method returns at the end.

**Complexity:** O(total characters read) time, O(1) extra space (the four-slot scratch and its cursor).
