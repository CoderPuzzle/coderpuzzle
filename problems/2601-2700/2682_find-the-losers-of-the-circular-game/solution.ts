// Straight simulation: friend 1 holds the ball at the start, and each turn i
// moves the holder i*k seats clockwise. At most n turns pass before some
// friend receives the ball twice, so the loop is tiny; i*k <= 2500 keeps
// Number exact far below 2^53.
function circularGameLosers(n: number, k: number): number[] {
    const received: boolean[] = new Array(n).fill(false);
    received[0] = true;
    let holder = 0;
    let turn = 1;
    for (;;) {
        holder = (holder + turn * k) % n;
        if (received[holder]) {
            break;
        }
        received[holder] = true;
        turn++;
    }
    const answer: number[] = [];
    for (let friend = 0; friend < n; friend++) {
        if (!received[friend]) {
            answer.push(friend + 1);
        }
    }
    return answer;
}
