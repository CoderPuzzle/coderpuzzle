class Solution {
  public:
    int largestInteger(int num) {
        string digits = to_string(num);
        string buckets[2];
        for (char ch : digits) {
            buckets[(ch - '0') % 2].push_back(ch);
        }
        sort(buckets[1].begin(), buckets[1].end(), greater<char>());
        sort(buckets[0].begin(), buckets[0].end(), greater<char>());
        size_t cursor[2] = {0, 0};
        for (char &ch : digits) {
            int parity = (ch - '0') % 2;
            ch = buckets[parity][cursor[parity]++];
        }
        return stoi(digits);
    }
};
