from typing import List, Optional
from collections import Counter


class Solution:
    def maxRepOpt1(self, text: str) -> int:
        counts = Counter(text)
        # run-length encode
        runs = []
        for ch in text:
            if runs and runs[-1][0] == ch:
                runs[-1][1] += 1
            else:
                runs.append([ch, 1])
        best = 0
        for ch, length in runs:
            best = max(best, min(length + 1, counts[ch]))
        for i in range(1, len(runs) - 1):
            if runs[i][1] == 1 and runs[i - 1][0] == runs[i + 1][0]:
                ch = runs[i - 1][0]
                combined = runs[i - 1][1] + runs[i + 1][1]
                extra = 1 if counts[ch] > combined else 0
                best = max(best, combined + extra)
        return best
