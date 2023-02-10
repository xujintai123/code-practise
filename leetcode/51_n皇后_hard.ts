function solveNQueens(n: number): string[][] {
    let res: string[][][] = [];

    /* 初始化棋盘 */
    function initCheckerboard(): string[][] {
        let checkerboard: string[][] = [];
        for (let i = 0; i < n; i++) {
            checkerboard.push(new Array(n).fill('.'));
        }
        return checkerboard;
    }

    function getCopyCheckerboard(checkerboard: string[][] ) {
        let arr: string[][] = [];
        for (let i = 0; i < n; i++) {
            arr.push(checkerboard[i].slice());
        }
        return arr;
    }

    // 初始化棋盘
    const checkerboard = initCheckerboard();

    function dfs(row: number) {
        /* 第 n + 1 层；这时row行已经都校验通过；注意row 从 0 开始 */
        if (row === n) {
            /* 由于是二维数组，这里需要使用方法深拷贝下再加入res */
            res.push(getCopyCheckerboard(checkerboard));
            return;
        }

        /*  一行一行放，当前行找位置时，只需要和之前的行进行校验。*/
        for (let i = 0; i < n; i++) {
            if (isValid(row, i)) {
                checkerboard[row][i] = 'Q';
                dfs(row + 1);
                // 回溯时清空皇后
                checkerboard[row][i] = '.';
            }

        }
    }

    /*  一行一行放，当前行找位置时，只需要和之前的行进行校验。
    由于是一行一行找位置，所以不用校验和本次相同行的；
    只需要校验 相同列、45度角 、135度角的位置 */
    function isValid(row: number, column: number) {
        /* 校验之前行是否已经在此列放置过 */
        for (let i = 0; i < row; i++) {
            if (checkerboard[i][column] === 'Q') {
                return false;
            }
        }

        /* 校验之前行是否在此位置的45度对角线上放置过（以数学坐标系为基准的45度角：第一象限） */
        for (let i = row - 1, j = column + 1; i >= 0 && j < n; i--, j++) {
            if (checkerboard[i][j] === 'Q') {
                return false;
            }
        }

        /* 校验之前行是否在此位置的135度对角线上放置过（以数学坐标系为基准：第二象限） */
        for (let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--) {
            if (checkerboard[i][j] === 'Q') {
                return false;
            }
        }

        return true;
    }

    dfs(0);

    return res.map(checkerboard => {
        return checkerboard.map(row => row.join(''));
    });

};

// 需要会写的单词 valid 有效的；column 柱（通常表示列）

solveNQueens(4);