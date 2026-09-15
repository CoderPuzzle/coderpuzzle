// Minimum presses are forced: each new position starts with key 1 (key 2
// on an empty screen is impossible), appending 'a', and key 2 then
// advances that last character (c - 'a') times to the wanted one. The
// screen states therefore stream out deterministically — for each
// position, emit the string after the append and again after every
// advance — which is exactly the sequence of all strings that ever
// appear.
impl Solution {
    pub fn string_sequence(target: String) -> Vec<String> {
        let mut screen: Vec<u8> = Vec::with_capacity(target.len());
        let mut states: Vec<String> = Vec::new();
        for &c in target.as_bytes() {
            screen.push(b'a');
            states.push(String::from_utf8_lossy(&screen).into_owned());
            let mut d = b'b';
            while d <= c {
                let n = screen.len();
                screen[n - 1] = d;
                states.push(String::from_utf8_lossy(&screen).into_owned());
                d += 1;
            }
        }
        states
    }
}
