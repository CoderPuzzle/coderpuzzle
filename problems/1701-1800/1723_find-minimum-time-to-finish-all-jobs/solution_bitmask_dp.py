class Solution:
    def minimumTimeRequired(self, jobs: list[int], k: int) -> int:
        n = len(jobs)
        size = 1 << n
        full = size - 1
        # sums[mask]: total length of the job set named by mask, built by
        # peeling off one lowest-numbered job at a time.
        sums = [0] * size
        for mask in range(1, size):
            low = mask & -mask
            sums[mask] = sums[mask ^ low] + jobs[low.bit_length() - 1]
        total = sums[full]
        # prev[mask]: lightest maximum load achievable when the job set mask
        # is covered by the workers placed so far. One worker is placed, so
        # every set simply lands on it whole.
        prev = sums[:]
        for _ in range(2, k + 1):
            cur = [0] * size
            for mask in range(1, size):
                low = mask & -mask
                rest = mask ^ low
                # The worker being placed must take the lowest-numbered job
                # still unserved — workers are interchangeable — so only
                # submasks holding that bit are distinct choices.
                best = total
                sub = rest
                while True:
                    # The newcomer carries sub; everything else was already
                    # solved on one fewer worker. The worse side of the pair
                    # is the finished assignment's maximum load.
                    carried = prev[rest ^ sub]
                    load = sums[sub | low]
                    if carried < load:
                        carried = load
                    if carried < best:
                        best = carried
                    if sub == 0:
                        break
                    sub = (sub - 1) & rest
                cur[mask] = best
            prev = cur
        return prev[full]
