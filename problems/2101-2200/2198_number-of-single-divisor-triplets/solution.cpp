class Solution {
  public:
    long long singleDivisorTriplet(vector<int> &nums) {
        vector<int> freq(101, 0);
        for (int num : nums) {
            freq[num]++;
        }
        vector<int> values;
        for (int v = 1; v <= 100; v++) {
            if (freq[v]) {
                values.push_back(v);
            }
        }
        long long total = 0;
        for (size_t i = 0; i < values.size(); i++) {
            int a = values[i];
            for (size_t j = i; j < values.size(); j++) {
                int b = values[j];
                for (size_t k = j; k < values.size(); k++) {
                    int c = values[k];
                    int s = a + b + c;
                    // divisibility is checked per index, so repeated
                    // values contribute one hit per copy
                    int hits = (s % a == 0) + (s % b == 0) + (s % c == 0);
                    if (hits != 1) {
                        continue;
                    }
                    if (a == b && b == c) {
                        long long f = freq[a];
                        total += f * (f - 1) * (f - 2);
                    } else if (a == b || b == c) {
                        int twice = (a == b) ? a : b;
                        int once = (a == b) ? c : a;
                        long long f = freq[twice];
                        total += f * (f - 1) / 2 * freq[once] * 6;
                    } else {
                        total += (long long)freq[a] * freq[b] * freq[c] * 6;
                    }
                }
            }
        }
        return total;
    }
};
