class Solution {
  public:
    string crackSafe(int n, int k) {
        // Iterative Hierholzer over the de Bruijn graph: nodes are (n-1)-digit
        // strings (as base-k integers), edges are the k^n passwords. Digits are
        // tried in ascending order, matching the reference's deterministic walk.
        long long total = 1;
        for (int i = 0; i < n; i++)
            total *= k;
        long long shift = 1;
        for (int i = 0; i < n - 1; i++)
            shift *= k;
        vector<char> seen(total, 0);
        vector<long long> nodeStack;
        vector<int> digitStack; // digit used to enter each stacked node
        nodeStack.push_back(0);
        digitStack.push_back(0);
        string out;
        while (!nodeStack.empty()) {
            long long node = nodeStack.back();
            int nxt = -1;
            for (int x = 0; x < k; x++) {
                long long e = node * k + x;
                if (!seen[e]) {
                    seen[e] = 1;
                    nxt = x;
                    break;
                }
            }
            if (nxt >= 0) {
                nodeStack.push_back((node * k + nxt) % shift);
                digitStack.push_back(nxt);
            } else {
                nodeStack.pop_back();
                int d = digitStack.back();
                digitStack.pop_back();
                if (!nodeStack.empty()) {
                    out.push_back((char)('0' + d));
                }
            }
        }
        out.append(n - 1, '0');
        return out;
    }
};
