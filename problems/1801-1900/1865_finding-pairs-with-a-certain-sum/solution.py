from collections import Counter


class FindSumPairs:
    """nums2 changes but nums1 never does, so keep a frequency map of nums2
    and scan the short nums1 on every count: for each a in nums1 add
    freq2[tot - a]. An add updates one array slot plus its two frequency
    entries. The pair count can reach |nums1| * |nums2| = 10^8, which is why
    the counter is 64-bit.
    """

    def __init__(self, nums1: List[int], nums2: List[int]):
        self.nums1 = nums1
        self.nums2 = nums2
        self.freq2 = Counter(nums2)

    def add(self, index: int, val: int) -> None:
        old = self.nums2[index]
        self.freq2[old] -= 1
        new = old + val
        self.nums2[index] = new
        self.freq2[new] += 1

    def count(self, tot: int) -> int:
        return sum(self.freq2.get(tot - a, 0) for a in self.nums1)
