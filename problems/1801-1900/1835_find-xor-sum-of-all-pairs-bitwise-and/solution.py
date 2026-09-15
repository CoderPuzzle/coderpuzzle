class Solution:
    def getXORSum(self, arr1: List[int], arr2: List[int]) -> int:
        # AND distributes over XOR: (a&b)^(a&c) = a&(b^c). Folding that
        # repeatedly collapses all n*m pair terms to xor(arr1) & xor(arr2).
        x = 0
        for a in arr1:
            x ^= a
        y = 0
        for b in arr2:
            y ^= b
        return x & y
