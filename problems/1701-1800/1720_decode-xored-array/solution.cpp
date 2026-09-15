class Solution {
  public:
    vector<int> decode(vector<int> &encoded, int first) {
        // XOR is its own inverse: canceling arr[i] out of
        // encoded[i] = arr[i] ^ arr[i + 1] leaves
        // arr[i + 1] = encoded[i] ^ arr[i]. Seed with first and unroll
        // the chain left to right — the running element is the only
        // unknown in the next equation.
        vector<int> arr(encoded.size() + 1);
        arr[0] = first;
        for (size_t i = 0; i < encoded.size(); ++i) {
            arr[i + 1] = arr[i] ^ encoded[i];
        }
        return arr;
    }
};
