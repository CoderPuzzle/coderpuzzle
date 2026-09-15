from typing import List


class Solution:
    def mostPopularCreator(self, creators: List[str], ids: List[str], views: List[int]) -> List[List[str]]:
        # One pass keeps three running values per creator: total views,
        # best single-video view count, and the id achieving it
        # (lexicographically smallest on a tie). Totals reach
        # 10^5 * 10^5 = 10^10, so sums are plain (exact) ints.
        totals = {}
        best_view = {}
        best_id = {}
        for creator, video_id, view in zip(creators, ids, views):
            totals[creator] = totals.get(creator, 0) + view
            current = best_view.get(creator)
            if current is None or view > current or (view == current and video_id < best_id[creator]):
                best_view[creator] = view
                best_id[creator] = video_id
        top = max(totals.values())
        return sorted([[creator, best_id[creator]] for creator in totals if totals[creator] == top])
