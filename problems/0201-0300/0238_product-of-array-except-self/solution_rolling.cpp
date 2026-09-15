// The judge's expected values are exact big integers, so the products are
// computed with a small base-1e9 bignum. The harness serializes the return
// value via overloaded coderpuzzle_json functions, so the bignum provides an
// overload that renders it as a bare integer token.
#include <cstdint>

struct CoderPuzzleBig {
    bool neg = false;
    vector<uint32_t> d; // base 1e9, little-endian; empty = zero
};

static CoderPuzzleBig coderpuzzleBigOne() { return CoderPuzzleBig{false, {1}}; }

static CoderPuzzleBig coderpuzzleBigMulSmall(const CoderPuzzleBig &a, long long v) {
    if (v == 0 || a.d.empty()) {
        return CoderPuzzleBig{};
    }
    CoderPuzzleBig r;
    r.neg = a.neg != (v < 0);
    unsigned long long x = v < 0 ? -(unsigned long long)v : (unsigned long long)v;
    unsigned long long carry = 0;
    for (uint32_t digit : a.d) {
        unsigned long long cur = (unsigned long long)digit * x + carry;
        r.d.push_back((uint32_t)(cur % 1000000000ULL));
        carry = cur / 1000000000ULL;
    }
    while (carry) {
        r.d.push_back((uint32_t)(carry % 1000000000ULL));
        carry /= 1000000000ULL;
    }
    return r;
}

static CoderPuzzleBig coderpuzzleBigMulBig(const CoderPuzzleBig &a, const CoderPuzzleBig &b) {
    if (a.d.empty() || b.d.empty()) {
        return CoderPuzzleBig{};
    }
    CoderPuzzleBig r;
    r.neg = a.neg != b.neg;
    r.d.assign(a.d.size() + b.d.size() + 1, 0);
    for (size_t i = 0; i < a.d.size(); i++) {
        unsigned long long carry = 0;
        size_t j = 0;
        while (j < b.d.size() || carry) {
            unsigned long long cur = (unsigned long long)r.d[i + j] + carry;
            if (j < b.d.size()) {
                cur += (unsigned long long)a.d[i] * b.d[j];
            }
            r.d[i + j] = (uint32_t)(cur % 1000000000ULL);
            carry = cur / 1000000000ULL;
            j++;
        }
    }
    while (!r.d.empty() && r.d.back() == 0) {
        r.d.pop_back();
    }
    return r;
}

static string coderpuzzleBigText(const CoderPuzzleBig &b) {
    if (b.d.empty()) {
        return "0";
    }
    string s = b.neg ? "-" : "";
    s += to_string(b.d.back());
    for (size_t i = b.d.size() - 1; i-- > 0;) {
        char buf[16];
        snprintf(buf, sizeof(buf), "%09u", b.d[i]);
        s += buf;
    }
    return s;
}

static string coderpuzzle_json(const CoderPuzzleBig &value) { return coderpuzzleBigText(value); }

class Solution {
  public:
    vector<CoderPuzzleBig> productExceptSelf(vector<int> &nums) {
        // The product except nums[i] factors as (product of everything
        // before i) x (product of everything after i), both computable as
        // running products — no division, which zeros would break anyway.
        int n = nums.size();
        vector<CoderPuzzleBig> answer(n, coderpuzzleBigOne());
        // First sweep stores the running left product BEFORE folding nums[i]
        // in, so answer[i] ends up holding exactly the prefix preceding i.
        CoderPuzzleBig left = coderpuzzleBigOne();
        for (int i = 0; i < n; i++) {
            answer[i] = left;
            left = coderpuzzleBigMulSmall(left, nums[i]);
        }
        // Second sweep from the right: its running product likewise lags one
        // position behind, then absorbs nums[i]. Each cell becomes
        // prefix x suffix.
        CoderPuzzleBig right = coderpuzzleBigOne();
        for (int i = n - 1; i >= 0; i--) {
            answer[i] = coderpuzzleBigMulBig(answer[i], right);
            right = coderpuzzleBigMulSmall(right, nums[i]);
        }
        // Zeros need no special casing: a lone zero zeroes every cell but its
        // own, and multiple zeros zero everything — all automatic.
        return answer;
    }
};
