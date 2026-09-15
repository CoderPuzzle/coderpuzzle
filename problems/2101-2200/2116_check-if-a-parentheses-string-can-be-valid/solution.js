var canBeValid = function (s, locked) {
    if (s.length % 2 === 1) return false;
    let minimum = 0;
    let maximum = 0;
    for (let index = 0; index < s.length; index++) {
        if (locked[index] === "0") {
            minimum--;
            maximum++;
        } else if (s[index] === "(") {
            minimum++;
            maximum++;
        } else {
            minimum--;
            maximum--;
        }
        if (maximum < 0) return false;
        minimum = Math.max(minimum, 0);
    }
    return minimum === 0;
};
