class Solution {
  public:
    string complexNumberMultiply(string num1, string num2) {
        // Parse: drop the trailing 'i', then split at the LAST '+' — the
        // imaginary part may itself be negative, but the real part never
        // carries a '+', so that final '+' is the one true seam.
        auto [a, b] = parts(num1);
        auto [c, d] = parts(num2);
        // Multiply: (a + bi)(c + di) = (ac - bd) + (ad + bc)i.
        int real = a * c - b * d;
        int imag = a * d + b * c;
        // Render: the output mirrors the input format, so the '+' is literal
        // — a negative imaginary part stays "0+-2i", never folded to "0-2i".
        return to_string(real) + "+" + to_string(imag) + "i";
    }

  private:
    pair<int, int> parts(const string &num) {
        string body = num.substr(0, num.size() - 1);
        size_t seam = body.rfind('+');
        return {stoi(body.substr(0, seam)), stoi(body.substr(seam + 1))};
    }
};
