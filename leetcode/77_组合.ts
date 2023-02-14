function combine(n: number, k: number): number[][] {
    let arr: number[] = [], res: number[][] = [];
    function dfs(index: number, start: number) {
        if (index === k) {
            res.push(arr.slice());
            return;
        }
        for (let i = start; i <= n; i++) {
            /* 剪枝 */
            if (n - start + arr.length + 1 < k) {
                break;
            }
            arr[index] = i;
            dfs(index + 1, arr[index] + 1);
        }
    }

    dfs(0, 1);
    return res;
};