# Solutions — Replace the Substring for Balanced String

## Slide the smallest window whose removal leaves no surplus

Counting first: outside the replaced window each letter must appear at most
`n/4` times — the window is then free to supply whatever the rest lacks. So
subtract `n/4` from each total and keep only the letters with a positive
surplus; the task reduces to finding the shortest substring that contains at
least those surplus counts.

That is a classic minimum-window scan. Maintain counts inside the window
`[left, right)`; grow `right` while some surplus letter is still under-served,
and whenever every surplus letter is covered, try to shrink from the left,
recording the window length just before it stops being valid. Each pointer
only moves forward, so the scan is linear.

If there is no surplus at all the string is already balanced and the answer
is zero — the recorded best simply never drops below the initial `n`.

**Complexity:** `O(n)` time, `O(1)` space (four counters).
