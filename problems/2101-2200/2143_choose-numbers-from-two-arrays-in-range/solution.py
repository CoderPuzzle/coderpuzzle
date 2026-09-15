class Solution:
    def countSubranges(self, nums1: List[int], nums2: List[int]) -> int:
        mod = 1_000_000_007
        previous = {}
        answer = 0
        for first, second in zip(nums1, nums2):
            current = {first: 1, -second: 1}
            if first == -second:
                current[first] = 2
            for difference, count in previous.items():
                current[difference + first] = (current.get(difference + first, 0) + count) % mod
                current[difference - second] = (current.get(difference - second, 0) + count) % mod
            answer = (answer + current.get(0, 0)) % mod
            previous = current
        return answer
