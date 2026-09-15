class Solution {
  public:
    int minJumps(vector<int> &nums) {
        // BFS over indices. When a prime-valued index p is first settled,
        // every index whose value is divisible by p joins the next BFS
        // layer, so the bucket of p is cleared after that single use — any
        // later prime-p index is strictly farther. Buckets are built
        // lazily by walking multiples of p up to max(nums) through a
        // value -> indices table.
        int n = nums.size();
        if (n == 1)
            return 0;
        int limit = 0;
        for (int v : nums)
            limit = max(limit, v);
        vector<char> isPrime(limit + 1, 1);
        isPrime[0] = 0;
        if (limit >= 1)
            isPrime[1] = 0;
        for (int f = 2; (long long)f * f <= limit; ++f)
            if (isPrime[f])
                for (int m = f * f; m <= limit; m += f)
                    isPrime[m] = 0;
        unordered_map<int, vector<int>> byValue;
        for (int i = 0; i < n; ++i)
            byValue[nums[i]].push_back(i);
        vector<int> dist(n, -1);
        dist[0] = 0;
        queue<int> bfs;
        bfs.push(0);
        unordered_set<int> used;
        while (!bfs.empty()) {
            int i = bfs.front();
            bfs.pop();
            int d = dist[i] + 1;
            if (i > 0 && dist[i - 1] == -1) {
                dist[i - 1] = d;
                bfs.push(i - 1);
            }
            if (i + 1 < n && dist[i + 1] == -1) {
                dist[i + 1] = d;
                bfs.push(i + 1);
            }
            int p = nums[i];
            if (p > 1 && isPrime[p] && !used.count(p)) {
                used.insert(p);
                vector<int> bucket;
                for (int m = p; m <= limit; m += p) {
                    auto it = byValue.find(m);
                    if (it != byValue.end())
                        bucket.insert(bucket.end(), it->second.begin(), it->second.end());
                }
                for (int j : bucket)
                    if (dist[j] == -1) {
                        dist[j] = d;
                        bfs.push(j);
                    }
            }
        }
        return dist[n - 1];
    }
};
