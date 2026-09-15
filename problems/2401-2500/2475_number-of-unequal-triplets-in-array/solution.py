class Solution:
    def unequalTriplets(self, nums: List[int]) -> int:
        # Three distinct positions with three distinct values order uniquely
        # by index, so for each value v the valid triplets using v as the
        # value-sorted middle are left * freq[v] * right. Values lie in
        # [1, 1000], so a fixed table indexed by value replaces the map.
        count = [0] * 1001
        for value in nums:
            count[value] += 1
        total = len(nums)
        left = 0
        answer = 0
        for value in range(1, 1001):
            freq = count[value]
            if freq:
                answer += left * freq * (total - left - freq)
                left += freq
        return answer
