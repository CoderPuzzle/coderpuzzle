impl Solution {
    // Neither operation creates or destroys a letter: Operation 1 only
    // rearranges characters, and Operation 2 swaps the totals of two
    // existing letters. Two strings are therefore close exactly when
    // they occur over the same letter set with the same multiset of
    // frequencies — tallied into 26-slot count arrays, presence compared
    // slot by slot, then both arrays sorted and compared as lists.
    pub fn close_strings(word1: String, word2: String) -> bool {
        let mut counts1 = [0i32; 26];
        let mut counts2 = [0i32; 26];
        for byte in word1.bytes() {
            counts1[(byte - b'a') as usize] += 1;
        }
        for byte in word2.bytes() {
            counts2[(byte - b'a') as usize] += 1;
        }
        for i in 0..26 {
            if (counts1[i] > 0) != (counts2[i] > 0) {
                return false;
            }
        }
        counts1.sort_unstable();
        counts2.sort_unstable();
        counts1 == counts2
    }
}
