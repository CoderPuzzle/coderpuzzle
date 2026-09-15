class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        n = len(s)
        zeros_at = [i for i, character in enumerate(s) if character == "0"]
        total_zeros = len(zeros_at)
        answer = 0
        first_zero = 0
        for left in range(n):
            while first_zero < total_zeros and zeros_at[first_zero] < left:
                first_zero += 1
            if first_zero < total_zeros:
                answer += zeros_at[first_zero] - left
            else:
                answer += n - left
            need = 1
            j = 1
            while need <= n - left and first_zero + j - 1 < total_zeros:
                low = zeros_at[first_zero + j - 1]
                required = left + need
                if required > low:
                    low = required
                high = zeros_at[first_zero + j] if first_zero + j < total_zeros else n
                if high > low:
                    answer += high - low
                j += 1
                need += 2 * j
        return answer
