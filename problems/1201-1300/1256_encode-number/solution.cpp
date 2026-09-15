class Solution {
  public:
    string encode(int num) {
        // num + 1 in binary, minus its leading 1.
        string bits = bitset<32>(static_cast<unsigned int>(num) + 1u).to_string();
        return bits.substr(bits.find('1') + 1);
    }
};
