# Solutions — Binary Watch

## Enumerate the 12 × 60 time grid

A binary watch face is two small binary numbers side by side: an hour 0-11 held in the top four LEDs and a minute 0-59 in the bottom six. A time is displayed when the lit LEDs across both rows total `turnedOn`, and the lit count of a number is exactly its popcount — so the task reduces to finding every (hour, minute) pair whose two popcounts sum to `turnedOn`.

Walking the hours 0-11 as the outer loop and the minutes 0-59 as the inner one visits every representable time exactly once, and in exactly the order the statement pins: hour-major with both fields ascending is time-of-day order, so the walk emits the answer directly and no post-sort is needed. Each candidate costs one popcount comparison and one `"%d:%02d"` format, and the format alone enforces the spelling rules — no leading zero on the hour, always two digits on the minute.

The alternative is enumerating the 2^10 LED configurations, but that space walks 1024 candidates of which only 720 decode to a displayable time: hours 12-15 and minutes 60-63 light LEDs the watch cannot show, so every candidate needs a validity filter and the survivors still come out unordered. The 12 × 60 grid is the domain itself — 720 checks, no rejects, no sort.

**Complexity:** `O(12 × 60)` time — 720 popcount checks regardless of `turnedOn` — and `O(1)` auxiliary space excluding the output.
