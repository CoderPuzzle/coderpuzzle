class Solution:
    def nextClosestTime(self, time: str) -> str:
        # A candidate may reuse only digits already on the clock, so at
        # most 4^4 = 256 four-digit drawings cover everything. Keep the
        # drawings that are real clock times (hour < 24, minute < 60) and
        # pick the one whose wrapped lead over the input, (candidate -
        # input) mod 1440, is smallest. Seeding the answer with the input
        # itself at a full day's lead is the wrap: 23:59 comes around to
        # 22:22, 11:11 to itself.
        digits = sorted(int(c) for c in set(time) - {":"})
        start = int(time[0:2]) * 60 + int(time[3:5])
        best = start
        best_gap = 1440
        for h1 in digits:
            for h2 in digits:
                hour = h1 * 10 + h2
                if hour >= 24:
                    continue
                for m1 in digits:
                    for m2 in digits:
                        minute = m1 * 10 + m2
                        if minute >= 60:
                            continue
                        total = hour * 60 + minute
                        gap = (total - start + 1440) % 1440
                        if 0 < gap < best_gap:
                            best_gap = gap
                            best = total
        return f"{best // 60:02d}:{best % 60:02d}"
