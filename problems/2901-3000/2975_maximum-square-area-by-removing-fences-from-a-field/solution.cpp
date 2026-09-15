class Solution {
  public:
    vector<long long> allGaps(long long outer, vector<long long> &fences) {
        vector<long long> xs = fences;
        xs.push_back(1);
        xs.push_back(outer);
        sort(xs.begin(), xs.end());
        vector<long long> out;
        for (int i = 0; i < (int)xs.size(); i++)
            for (int j = i + 1; j < (int)xs.size(); j++)
                out.push_back(xs[j] - xs[i]);
        return out;
    }

    long long maximizeSquareArea(long long m, long long n, vector<long long> &hFences, vector<long long> &vFences) {
        // Adding the immovable border fences at 1 and outer makes every
        // surviving region width a pairwise difference of the positions.
        // The square side is the largest gap present in both directions.
        vector<long long> hGaps = allGaps(m, hFences);
        sort(hGaps.begin(), hGaps.end());
        hGaps.erase(unique(hGaps.begin(), hGaps.end()), hGaps.end());
        long long best = -1;
        for (long long d : allGaps(n, vFences)) {
            if (d > best && binary_search(hGaps.begin(), hGaps.end(), d)) {
                best = d;
            }
        }
        // best <= 10^9 - 1, so the square fits in 64 bits before the modulo.
        return best < 0 ? -1 : best * best % 1000000007LL;
    }
};
