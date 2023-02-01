/*
 * @lc app=leetcode.cn id=79 lang=golang
 *
 * [79] 单词搜索
 *
 * https://leetcode-cn.com/problems/word-search/description/
 *
 * algorithms
 * Medium (37.95%)
 * Likes:    153
 * Dislikes: 0
 * Total Accepted:    13.3K
 * Total Submissions: 34.9K
 * Testcase Example:  '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n"ABCCED"'
 *
 * 给定一个二维网格和一个单词，找出该单词是否存在于网格中。
 *
 * 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
 *
 * 示例:
 *
 * board =
 * [
 * ⁠ ['A','B','C','E'],
 * ⁠ ['S','F','C','S'],
 * ⁠ ['A','D','E','E']
 * ]
 *
 * 给定 word = "ABCCED", 返回 true.
 * 给定 word = "SEE", 返回 true.
 * 给定 word = "ABCB", 返回 false.
 *
 */
function exist(board: string[][], word: string): boolean {

    const w = board[0].length;
    const l = board.length;

    let arrMap: boolean[][] = [];
    for (let i = 0; i < l; i++) {
        arrMap.push(new Array(w));
    }


    /* 
    当前位置是否命中当前字母.
    退出循环: 
    1. 未命中(1.位置超出边界、2.当前位置的数值已经被使用、3.当前位置的数值和当前字母不匹配)；
    2. word的所有字母全部校验完毕 (depth === word.length)
    命中则将周围位置和下一个字母进行匹配 */

    function dfs(row: number, col: number, depth: number): boolean {
        /* word的所有字母全部校验完毕 返回true */
        if (depth === word.length) return true;

        /* 位置超出边界 */
        if (row < 0 || row >= l || col < 0 || col >= w) {
            return false;
        }

        /* 当前位置的数值已经被使用过 */
        if (arrMap[row][col]) {
            return false;
        }

        /* 当前位置的数值和当前字母不匹配 */
        if (board[row][col] !== word[depth]) {
            return false;
        }

        /* 递归过程中标记使用过的位置 */
        arrMap[row][col] = true;
        depth++;
        /* 本次匹配通过，校验周围位置和下一个字母是否匹配 */
        const res = dfs(row, col + 1, depth) || dfs(row, col - 1, depth) || dfs(row + 1, col, depth) || dfs(row - 1, col, depth);
        arrMap[row][col] = false;
        /* 回溯过程中取消标记 */
        return res;
    }

    for (let i = 0; i < l; i++) {
        for (let j = 0; j < w; j++) {
            if (dfs(i, j, 0)) {
                return true;
            }
        }
    }

    return false;
}

exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED");