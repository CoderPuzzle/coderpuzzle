from typing import List, Optional
from collections import Counter


class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        counts = Counter(tasks)
        max_freq = max(counts.values())
        # Letters tying the max each occupy one slot of the final partial run.
        num_max = sum(1 for v in counts.values() if v == max_freq)
        # The bottleneck letter frames (max_freq - 1) cycles of n + 1 plus the
        # final run; enough distinct tasks fill every gap, so never answer less
        # than the plain task count.
        return max(len(tasks), (max_freq - 1) * (n + 1) + num_max)
