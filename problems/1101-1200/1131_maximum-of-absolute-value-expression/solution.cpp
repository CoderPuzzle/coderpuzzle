class Solution {
  public:
    int maxAbsValExpr(vector<int> &arr1, vector<int> &arr2) {
        // |A|+|B|+|C| = max over sign triples of s1*A + s2*B + s3*C, so the
        // best pair distance is the widest span of one of 8 projections.
        int best = INT_MIN;
        for (int s1 : {1, -1}) {
            for (int s2 : {1, -1}) {
                for (int s3 : {1, -1}) {
                    int high = s1 * arr1[0] + s2 * arr2[0];
                    int low = high;
                    for (int k = 0; k < (int)arr1.size(); ++k) {
                        int value = s1 * arr1[k] + s2 * arr2[k] + s3 * k;
                        if (value > high)
                            high = value;
                        else if (value < low)
                            low = value;
                    }
                    best = max(best, high - low);
                }
            }
        }
        return best;
    }
};
