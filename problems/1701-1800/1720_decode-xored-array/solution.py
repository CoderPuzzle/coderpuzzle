from typing import List


class Solution:
    def decode(self, encoded: List[int], first: int) -> List[int]:
        # XOR is its own inverse: canceling arr[i] out of
        # encoded[i] = arr[i] ^ arr[i + 1] leaves
        # arr[i + 1] = encoded[i] ^ arr[i]. Seed with first and unroll
        # the chain left to right — the running element is the only
        # unknown in the next equation.
        arr = [first]
        for value in encoded:
            arr.append(arr[-1] ^ value)
        return arr
