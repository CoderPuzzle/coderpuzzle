class Solution {
  public:
    string minimizeError(vector<string> &prices, int target) {
        // Work entirely in integer thousandths so nothing ever touches a
        // float: "1.500" splits into an integer part (the floor) and a
        // 3-digit fractional part (in [0, 1000)).
        long long sumFloors = 0;
        vector<int> fracs;
        for (const string &price : prices) {
            size_t dot = price.find('.');
            int floorVal = stoi(price.substr(0, dot));
            int fracVal = stoi(price.substr(dot + 1));
            sumFloors += floorVal;
            if (fracVal != 0) {
                fracs.push_back(fracVal);
            }
        }

        int countNonint = static_cast<int>(fracs.size());
        long long sumCeils = sumFloors + countNonint;
        if (target < sumFloors || target > sumCeils) {
            return "-1";
        }

        // Flooring everything reaches sumFloors; each fractional price
        // switched to its ceiling adds exactly 1, so exactly k of them
        // must switch.
        int k = static_cast<int>(target - sumFloors);

        // Switching a price with fractional part f changes its error
        // contribution from f to (1000 - f): cheapest for the largest f.
        // Flip the k largest fractions first.
        long long baseError = 0;
        for (int f : fracs) {
            baseError += f;
        }
        sort(fracs.begin(), fracs.end(), greater<int>());
        long long sumFlip = 0;
        for (int i = 0; i < k; i++) {
            sumFlip += fracs[i];
        }
        long long totalError = baseError + static_cast<long long>(k) * 1000 - 2 * sumFlip;

        long long wholePart = totalError / 1000;
        long long fracPart = totalError % 1000;
        char buf[32];
        snprintf(buf, sizeof(buf), "%lld.%03lld", wholePart, fracPart);
        return string(buf);
    }
};
