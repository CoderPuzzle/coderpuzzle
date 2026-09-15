from typing import List


class Solution:
    def sortTheStudents(self, score: List[List[int]], k: int) -> List[List[int]]:
        # Sorting the rows by their column-k entry, largest first, is the
        # whole problem: extracting a comparison key is O(1) row indexing.
        # Scores are pairwise distinct across the matrix, so no two rows
        # ever tie on the key and the sorted order is unique. Returns a
        # new matrix; the input is left untouched.
        return sorted(score, key=lambda row: -row[k])
