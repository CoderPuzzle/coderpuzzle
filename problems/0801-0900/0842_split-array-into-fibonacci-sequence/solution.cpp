class Solution {
  public:
    vector<int> splitIntoFibonacci(string num) {
        // Only the first two pieces of a split are free — every later term
        // is the sum of the two before it — so a candidate split is nothing
        // but a pair of cuts. Try cut pairs shortest piece first (a term
        // fits in 32 bits, so ten digits cap each piece), follow the forced
        // run under each pair, and return the first sequence that consumes
        // the string: exactly the shortest-first split the statement pins.
        const long long limit = 2147483647LL;
        const int n = num.size();
        for (int i = 1; i <= min(10, n - 2); ++i) {
            if (num[0] == '0' && i > 1)
                break;
            long long a = stoll(num.substr(0, i));
            if (a > limit)
                break;
            for (int j = i + 1; j <= min(i + 10, n - 1); ++j) {
                if (num[i] == '0' && j - i > 1)
                    break;
                long long b = stoll(num.substr(i, j - i));
                if (b > limit)
                    break;
                vector<int> seq{(int)a, (int)b};
                int pos = j;
                long long x = a, y = b;
                while (pos < n) {
                    long long z = x + y;
                    if (z > limit)
                        break;
                    string s = to_string(z);
                    if (num.compare(pos, s.size(), s) != 0)
                        break;
                    seq.push_back((int)z);
                    pos += s.size();
                    x = y;
                    y = z;
                }
                if (pos == n)
                    return seq;
            }
        }
        return {};
    }
};
