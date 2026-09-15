class Solution {
  public:
    vector<long long> kthPalindrome(vector<int> &queries, int intLength) {
        // The kth palindrome is the kth half-number mirrored, so each query
        // is one string construction; past the 9*10^(half-1) supply it is -1.
        const int half = (intLength + 1) / 2;
        const long long count = 9LL * (long long)pow(10.0, half - 1);
        vector<long long> answer;
        answer.reserve(queries.size());
        for (int query : queries) {
            if (query > count) {
                answer.push_back(-1);
                continue;
            }
            string prefix = to_string((long long)pow(10.0, half - 1) + query - 1);
            string digits = prefix;
            // Mirror the first intLength/2 digits back onto the end.
            for (int i = intLength / 2 - 1; i >= 0; i--) {
                digits.push_back(prefix[i]);
            }
            answer.push_back(stoll(digits));
        }
        return answer;
    }
};
