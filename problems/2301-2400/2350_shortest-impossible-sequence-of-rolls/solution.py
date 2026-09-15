from typing import List, Optional


class Solution:
    def shortestSequence(self, rolls: List[int], k: int) -> int:
        # A "complete window" (all k faces seen since the last reset)
        # extends coverage to sequences one roll longer.
        seen = set()
        # answer = (#complete windows so far) + 1; starts at 1 because with
        # zero windows some face never rolled, so length 1 already fails.
        answer = 1
        for r in rolls:
            seen.add(r)
            if len(seen) == k:
                # Window complete: whatever prefix was matched inside it,
                # every next symbol is available after this point.
                answer += 1
                seen = set()
        # No complete set of faces remains, so a sequence of this length
        # cannot be matched as a subsequence.
        return answer
