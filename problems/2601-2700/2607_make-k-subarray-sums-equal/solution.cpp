class Solution {
  public:
    long long makeSubKSumEqual(vector<int> &arr, int k) {
        int n = (int)arr.size();
        int a = n, b = k;
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        int g = a;
        // Adjacent windows of length k must agree, forcing arr[(i+k) mod n] =
        // arr[i]: stepping by k around the cycle visits exactly one residue
        // class mod g = gcd(n, k), and each class being constant is also
        // sufficient — any window then picks up each class k/g times.
        long long total = 0;
        for (int r = 0; r < g; r++) {
            vector<int> group;
            for (int i = r; i < n; i += g)
                group.push_back(arr[i]);
            sort(group.begin(), group.end());
            // Unit steps are cheapest around a median; classes are
            // independent, so costs simply add up.
            int median = group[group.size() / 2];
            for (int v : group)
                total += llabs((long long)v - median);
        }
        return total;
    }
};
