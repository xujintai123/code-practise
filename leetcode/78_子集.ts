function subsets(nums: number[]): number[][] {
    let res: number[][] = [[]], path: number[] = [];

    function backtracking(startIndex: number) {
        res.push(path.slice());
        for (let i = startIndex; i < nums.length; i++) {
            path.push(nums[i]);
            backtracking(i + 1);
            path.pop();
        }
    }

    backtracking(0);

    return res;
};

subsets([1, 2, 3,])