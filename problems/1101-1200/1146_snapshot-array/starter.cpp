class SnapshotArray {
  public:
    SnapshotArray(int length);
    void set(int index, int val);
    int snap();
    int get(int index, int snap_id);
};
