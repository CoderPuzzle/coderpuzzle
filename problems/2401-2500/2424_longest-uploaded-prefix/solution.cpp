class LUPrefix {
  public:
    // Uploaded marks in a boolean array plus a prefix pointer that only
    // moves forward. upload() sets one mark; longest() advances the
    // pointer while the next video is already uploaded. The pointer
    // never retreats, so its total travel across all calls is bounded
    // by n and every query is amortized constant.
    LUPrefix(int n) : n_(n), uploaded_(n + 1, false) {}

    void upload(int video) { uploaded_[video] = true; }

    int longest() {
        while (prefix_ < n_ && uploaded_[prefix_ + 1])
            ++prefix_;
        return prefix_;
    }

  private:
    int n_;
    vector<bool> uploaded_;
    int prefix_ = 0;
};
