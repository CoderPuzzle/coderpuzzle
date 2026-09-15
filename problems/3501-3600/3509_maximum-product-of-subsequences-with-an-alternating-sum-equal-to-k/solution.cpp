class Solution {
  public:
    // Per (parity, sum) we keep every reachable product <= limit, not just
    // the maximum: a larger product can blow past limit on a later multiply
    // while a smaller one survives. Product-0 reachability is tracked
    // separately, since a 0 can only be reached through a subsequence
    // containing a zero, even via products above the limit.
    int maxProduct(vector<int> &nums, int k, int limit) {
        int total = 0;
        for (int v : nums)
            total += v;
        if (abs(k) > total)
            return -1;
        int width = 2 * total + 1;
        vector<vector<unordered_set<int>>> products(2, vector<unordered_set<int>>(width));
        vector<vector<bool>> zero(2, vector<bool>(width, false));
        vector<vector<bool>> reach(2, vector<bool>(width, false));
        for (int x : nums) {
            auto np = products;
            auto nz = zero;
            auto nr = reach;
            for (int p = 0; p < 2; p++) {
                int sign = p == 0 ? 1 : -1;
                int q = 1 - p;
                for (int i = 0; i < width; i++) {
                    int s = i - total;
                    int ns = s + sign * x;
                    if (ns < -total || ns > total)
                        continue;
                    int j = ns + total;
                    if (reach[p][i]) {
                        nr[q][j] = true;
                        if (x == 0) {
                            nz[q][i] = true;
                        } else {
                            for (int prod : products[p][i]) {
                                int newp = prod * x;
                                if (newp <= limit)
                                    np[q][j].insert(newp);
                            }
                        }
                    }
                    if (zero[p][i]) {
                        nz[q][j] = true;
                    }
                }
            }
            if (x == 0) {
                nz[1][total] = true;
                nr[1][total] = true;
            } else {
                nr[1][x + total] = true;
                if (x <= limit)
                    np[1][x + total].insert(x);
            }
            products = move(np);
            zero = move(nz);
            reach = move(nr);
        }
        int ans = -1;
        int idx = k + total;
        if (idx >= 0 && idx < width) {
            for (int p = 0; p < 2; p++) {
                for (int prod : products[p][idx]) {
                    if (prod > ans)
                        ans = prod;
                }
                if (zero[p][idx] && ans < 0)
                    ans = 0;
            }
        }
        return ans;
    }
};
