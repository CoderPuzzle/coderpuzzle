class Solution {
  public:
    int maxProduct(string s) {
        int size = 1 << s.size();
        vector<int> palindromeLength(size);

        for (int mask = 1; mask < size; ++mask) {
            string subsequence;
            for (int index = 0; index < (int)s.size(); ++index) {
                if (mask & (1 << index))
                    subsequence += s[index];
            }
            if (equal(subsequence.begin(), subsequence.end(), subsequence.rbegin()))
                palindromeLength[mask] = subsequence.size();
        }

        int answer = 0;
        int full = size - 1;
        for (int first = 1; first < size; ++first) {
            if (palindromeLength[first] == 0)
                continue;
            int remaining = full ^ first;
            for (int second = remaining; second; second = (second - 1) & remaining)
                answer = max(answer, palindromeLength[first] * palindromeLength[second]);
        }
        return answer;
    }
};
