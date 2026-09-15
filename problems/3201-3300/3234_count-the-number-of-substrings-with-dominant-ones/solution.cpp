class Solution {
  public:
    long long numberOfSubstrings(string s) {
        int n = s.size();
        vector<int> zerosAt;
        zerosAt.reserve(n);
        for (int index = 0; index < n; index++) {
            if (s[index] == '0') {
                zerosAt.push_back(index);
            }
        }
        int totalZeros = zerosAt.size();
        long long answer = 0;
        int firstZero = 0;
        for (int left = 0; left < n; left++) {
            while (firstZero < totalZeros && zerosAt[firstZero] < left) {
                firstZero++;
            }
            if (firstZero < totalZeros) {
                answer += zerosAt[firstZero] - left;
            } else {
                answer += n - left;
            }
            long long need = 1;
            int j = 1;
            while (need <= n - left && firstZero + j - 1 < totalZeros) {
                long long low = zerosAt[firstZero + j - 1];
                long long required = static_cast<long long>(left) + need;
                if (required > low) {
                    low = required;
                }
                long long high = firstZero + j < totalZeros ? zerosAt[firstZero + j] : n;
                if (high > low) {
                    answer += high - low;
                }
                j++;
                need += 2 * j;
            }
        }
        return answer;
    }
};
