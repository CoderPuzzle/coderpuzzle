/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function (pushed, popped) {
    // The stack machine has almost no choices. While the top of the working
    // stack differs from the next value popped still wants, the wanted value
    // is either not pushed yet — pushing is the only way it can ever reach
    // the top — or it sits buried under elements pushed after it that are
    // still unpopped, and no continuation can fix that. The moment the tops
    // agree, popping is forced too. So a single left-to-right replay — push
    // each element, then pop while the top matches — is exhaustive, and the
    // pair is real exactly when the replay consumes all of popped.
    const stack = [];
    let j = 0;
    for (const value of pushed) {
        stack.push(value);
        while (stack.length > 0 && j < popped.length && stack[stack.length - 1] === popped[j]) {
            stack.pop();
            j++;
        }
    }
    return j === popped.length;
};
