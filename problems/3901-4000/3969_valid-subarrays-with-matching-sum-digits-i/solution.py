class Solution:
    def countValidSubarrays(self, nums: list[int], x: int) -> int:
        answer = 0
        for left in range(len(nums)):
            total = 0
            for value in nums[left:]:
                total += value
                first = total
                while first >= 10:
                    first //= 10
                if first == x and total % 10 == x:
                    answer += 1
        return answer
