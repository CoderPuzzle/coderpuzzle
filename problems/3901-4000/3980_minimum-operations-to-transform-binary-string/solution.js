var minOperations = function (s1, s2) {
    let selectedEdges = 0;
    let coveredByPrevious = false;
    let onesDifference = 0;

    for (let i = 0; i < s1.length; i++) {
        onesDifference += Number(s2[i] === "1") - Number(s1[i] === "1");
        const needsPair = s1[i] === "1" && s2[i] === "0";
        if (needsPair && !coveredByPrevious) {
            if (s1.length === 1) {
                return -1;
            }
            selectedEdges++;
            coveredByPrevious = i + 1 < s1.length;
        } else {
            coveredByPrevious = false;
        }
    }

    return onesDifference + 3 * selectedEdges;
};
