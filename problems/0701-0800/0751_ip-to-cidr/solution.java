import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] ipToCIDR(String ip, int n) {
        // The address lives in a long: 2^32 (the alignment cap at address
        // 0) must be representable, and an int would sign-flip at 2^31.
        long x = 0;
        for (String part : ip.split("\\.")) {
            x = x * 256 + Long.parseLong(part);
        }
        List<String> blocks = new ArrayList<>();
        while (n > 0) {
            // A block of 2^k addresses must start at an address divisible
            // by 2^k, and may not overrun the remaining count. So the
            // largest block at x is its lowest set bit (its own alignment),
            // halved down until it fits n; at address 0 nothing is set, so
            // the whole 2^32 space aligns and only n caps the block.
            long block = (x & -x) != 0 ? x & -x : 1L << 32;
            while (block > n) {
                block >>= 1;
            }
            long prefix = 32 - Long.numberOfTrailingZeros(block);
            blocks.add((x >> 24) + "." + ((x >> 16) & 255) + "." + ((x >> 8) & 255) + "." + (x & 255) + "/" + prefix);
            x += block;
            n -= block;
        }
        return blocks.toArray(new String[0]);
    }
}
