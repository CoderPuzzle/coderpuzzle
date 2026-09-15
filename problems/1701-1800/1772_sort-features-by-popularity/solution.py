from typing import List, Optional


class Solution:
    def sortFeatures(self, features: List[str], responses: List[str]) -> List[str]:
        # A response contributes to a feature at most once: count each
        # distinct word of the response that names a feature.
        popularity = {f: 0 for f in features}
        for response in responses:
            for word in set(response.split()):
                if word in popularity:
                    popularity[word] += 1
        # Total order: higher popularity first, then the earlier original
        # index — the comparator fully orders every pair, so no sort
        # stability is relied on.
        order = sorted(range(len(features)), key=lambda i: (-popularity[features[i]], i))
        return [features[i] for i in order]
