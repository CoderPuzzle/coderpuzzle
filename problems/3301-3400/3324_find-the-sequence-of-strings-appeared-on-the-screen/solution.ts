// Minimum presses are forced: each new position starts with key 1 (key 2
// on an empty screen is impossible), appending 'a', and key 2 then
// advances that last character (c - 'a') times to the wanted one. The
// screen states therefore stream out deterministically — for each
// position, emit the string after the append and again after every
// advance — which is exactly the sequence of all strings that ever
// appear.
function stringSequence(target: string): string[] {
    const screen: string[] = [];
    const states: string[] = [];
    for (const c of target) {
        const code = c.charCodeAt(0);
        screen.push("a");
        states.push(screen.join(""));
        for (let d = 98; d <= code; d += 1) {
            screen[screen.length - 1] = String.fromCharCode(d);
            states.push(screen.join(""));
        }
    }
    return states;
}
