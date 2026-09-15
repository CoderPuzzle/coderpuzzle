class Matrix3D {
  public:
    Matrix3D(int n);
    void setCell(int x, int y, int z);
    void unsetCell(int x, int y, int z);
    int largestMatrix();
};
