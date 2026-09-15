from typing import List


class Solution:
    def canFormArray(self, arr: List[int], pieces: List[List[int]]) -> bool:
        # Every value across pieces is distinct, so a piece is uniquely
        # identified by its first element. Map that value to the piece,
        # then walk arr and match pieces to consecutive slices.
        first = {piece[0]: piece for piece in pieces}

        index = 0
        n = len(arr)
        while index < n:
            piece = first.get(arr[index])
            if piece is None or arr[index : index + len(piece)] != piece:
                return False
            index += len(piece)
        return True
