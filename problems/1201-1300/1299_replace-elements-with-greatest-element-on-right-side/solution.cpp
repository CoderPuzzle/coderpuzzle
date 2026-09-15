class Solution {
  public:
    vector<int> replaceElements(vector<int> &arr) {
        // Sweep right to left: answer[i] is the max seen strictly right of
        // i, which the running maximum holds before arr[i] joins it.
        vector<int> answer(arr.size(), -1);
        int runningMax = -1;
        for (int i = (int)arr.size() - 1; i >= 0; --i) {
            answer[i] = runningMax;
            if (arr[i] > runningMax)
                runningMax = arr[i];
        }
        return answer;
    }
};
