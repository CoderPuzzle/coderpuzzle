class Solution {
  public:
    string subStrHash(string s, int power, int modulo, int k, int hashValue) {
        long long n = s.size();
        long long p = power;
        long long m = modulo;
        auto val = [&](long long i) { return s[i] - 'a' + 1; };

        // Hash of the rightmost window, then roll leftwards.
        long long cur = 0;
        long long pw = 1;
        for (long long j = 0; j < k; j++) {
            cur = (cur + val(n - k + j) * pw) % m;
            pw = pw * p % m;
        }
        long long top = 1;
        for (long long j = 0; j < k - 1; j++) {
            top = top * p % m;
        }
        string answer = (cur == hashValue) ? s.substr(n - k) : "";
        for (long long i = n - k - 1; i >= 0; i--) {
            cur = (((cur - val(i + k) * top % m + m) % m) * p + val(i)) % m;
            if (cur == hashValue) {
                answer = s.substr(i, k); // scanning right-to-left keeps the leftmost match
            }
        }
        return answer;
    }
};
