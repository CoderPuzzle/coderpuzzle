class Solution {
  public:
    int countTriplets(vector<int> &arr) {
        // per prefix value: occurrence count and sum of (index+1); seeded
        // with the empty prefix so segments starting at index 0 count too
        unordered_map<int, long long> count;
        unordered_map<int, long long> indexSum;
        count[0] = 1;
        indexSum[0] = 0;
        int prefix = 0;
        long long answer = 0;
        for (int j = 0; j < (int)arr.size(); j++) {
            prefix ^= arr[j];
            // equal prefixes at p < j => arr[p+1..j] XORs to 0 and every
            // internal split works: sum over such p of (j - p - 1)
            // telescopes to j * count - indexSum
            auto it = count.find(prefix);
            if (it != count.end()) {
                answer += (long long)j * it->second - indexSum[prefix];
                it->second += 1;
                indexSum[prefix] += j + 1;
            } else {
                count[prefix] = 1;
                indexSum[prefix] = j + 1;
            }
        }
        return static_cast<int>(answer);
    }
};
