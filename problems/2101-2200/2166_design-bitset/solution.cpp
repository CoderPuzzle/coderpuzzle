class Bitset {
  public:
    // A bit array plus a lazy orientation flag. The stored byte always
    // means "effective bit XOR flag", so fix/unfix complement their
    // write while the set is flipped, flip() only toggles the flag and
    // re-derives ones as size - ones, and all/one/count just read the
    // counter. toString is the one place every bit passes through the
    // flag again.
    Bitset(int size) : bits_(size, 0) {}

    void fix(int idx) {
        if ((bits_[idx] ^ flipped_) == 0) {
            bits_[idx] = 1 - flipped_;
            ++ones_;
        }
    }

    void unfix(int idx) {
        if ((bits_[idx] ^ flipped_) == 1) {
            bits_[idx] = flipped_;
            --ones_;
        }
    }

    void flip() {
        flipped_ = 1 - flipped_;
        ones_ = (int)bits_.size() - ones_;
    }

    bool all() { return ones_ == (int)bits_.size(); }
    bool one() { return ones_ > 0; }
    int count() { return ones_; }

    string toString() {
        string composition(bits_.size(), '0');
        for (size_t index = 0; index < bits_.size(); ++index)
            composition[index] = '0' + (bits_[index] ^ flipped_);
        return composition;
    }

  private:
    vector<int> bits_;
    int flipped_ = 0;
    int ones_ = 0;
};
