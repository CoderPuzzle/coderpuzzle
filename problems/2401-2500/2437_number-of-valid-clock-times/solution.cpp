class Solution {
  public:
    int countTime(string time) {
        // Count the valid hours and the valid minutes independently; the
        // two fields never constrain each other, so the answer is their
        // product. A field with no ? has exactly one value if it is itself
        // in range, which the given format guarantees.
        char hTens = time[0];
        char hOnes = time[1];
        char mTens = time[3];
        char mOnes = time[4];

        int hours = 0;
        for (int h = 0; h < 24; ++h) {
            if ((hTens == '?' || h / 10 == hTens - '0') && (hOnes == '?' || h % 10 == hOnes - '0'))
                ++hours;
        }

        int minutes = 0;
        for (int m = 0; m < 60; ++m) {
            if ((mTens == '?' || m / 10 == mTens - '0') && (mOnes == '?' || m % 10 == mOnes - '0'))
                ++minutes;
        }

        return hours * minutes;
    }
};
