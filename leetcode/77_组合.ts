function combine(n: number, k: number): number[][] {
    let arr: number[] = [], res: number[][] = [];
    function dfs(index: number, start: number) {
        if (index === k) {
            res.push(arr.slice());
            return;
        }
        for (let i = start; i <= n; i++) {
            /* 剪枝 */
            /* n - start + 1 剩余可添加的最大数值数目 */
            /* arr.length 已添加的数值数目 */
            if (n - start + 1 + arr.length < k) {
                break;
            }
            arr[index] = i;
            dfs(index + 1, arr[index] + 1);
        }
    }

    dfs(0, 1);
    return res;
};