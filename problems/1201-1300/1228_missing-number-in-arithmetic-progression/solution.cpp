class Solution {
  public:
    int missingNumber(vector<int> &arr) {
        // Endpoints survive, so the full progression had arr.size()+1 terms
        // from arr[0] to arr[-1]; the gap between its Gauss sum and the
        // surviving sum is the removed value.
        int n = (int)arr.size();
        long long full = (long long)(arr.front() + arr.back()) * (n + 1) / 2;
        long long sum = 0;
        for (int value : arr)
            sum += value;
        return (int)(full - sum);
    }
};
