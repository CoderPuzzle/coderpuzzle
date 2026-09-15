from typing import List, Optional


class Solution:
    def minNumberOperations(self, target: List[int]) -> int:
        # Each operation is one horizontal layer of the final profile, and the
        # first target[0] layers must all span index 0.
        ops = target[0]
        for i in range(1, len(target)):
            # The profile can only rise where a new operation starts, so pay
            # each positive rise; descents are free because earlier layers
            # can simply stop before index i.
            if target[i] > target[i - 1]:
                ops += target[i] - target[i - 1]
        return ops
