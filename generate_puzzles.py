import json
import random

puzzles = []

def empty_board():
    return [[None for _ in range(9)] for _ in range(10)]

for i in range(100):
    board = empty_board()

    b_jiang_r = random.choice([0, 1, 2])
    b_jiang_c = random.choice([3, 4, 5])
    r_jiang_r = random.choice([7, 8, 9])
    r_jiang_c = random.choice([3, 4, 5])

    if b_jiang_c == r_jiang_c:
        if b_jiang_c > 3:
            b_jiang_c -= 1
        else:
            b_jiang_c += 1

    board[b_jiang_r][b_jiang_c] = 'b_jiang'
    board[r_jiang_r][r_jiang_c] = 'r_jiang'

    pattern = i % 5
    if pattern == 0:
        name = f"车兵冷着 - 第{i+1}关"
        desc = "利用车和兵的配合完成绝杀"
        r_che_r = b_jiang_r
        r_che_c = (b_jiang_c + 1) if b_jiang_c < 5 else (b_jiang_c - 1)
        board[r_che_r][r_che_c] = 'r_che'
        board[2][4] = 'r_bing'
    elif pattern == 1:
        name = f"立马擒王 - 第{i+1}关"
        desc = "经典立马车杀法"
        board[b_jiang_r+1][b_jiang_c+1 if b_jiang_c < 5 else b_jiang_c-1] = 'r_ma'
        board[b_jiang_r][b_jiang_c+2 if b_jiang_c < 4 else b_jiang_c-2] = 'r_che'
    elif pattern == 2:
        name = f"重炮连击 - 第{i+1}关"
        desc = "利用重炮牵制将"
        board[b_jiang_r+2][b_jiang_c] = 'r_pao'
        board[b_jiang_r+3][b_jiang_c] = 'r_pao'
    elif pattern == 3:
        name = f"双车错 - 第{i+1}关"
        desc = "双车错杀法"
        board[b_jiang_r][b_jiang_c+1 if b_jiang_c < 5 else b_jiang_c-1] = 'r_che'
        board[b_jiang_r+1][b_jiang_c] = 'r_che'
    else:
        name = f"八面威风 - 第{i+1}关"
        desc = "综合残局挑战"
        board[3][b_jiang_c] = 'r_che'
        board[4][b_jiang_c+1 if b_jiang_c < 5 else b_jiang_c-1] = 'r_ma'
        if not board[1][b_jiang_c]:
            board[1][b_jiang_c] = 'b_shi'

    # ensure jiangs are still there
    board[b_jiang_r][b_jiang_c] = 'b_jiang'
    board[r_jiang_r][r_jiang_c] = 'r_jiang'

    num_defenders = (i % 3) + 1
    for _ in range(num_defenders):
        r = random.choice([0, 1, 2, 3])
        c = random.choice(range(9))
        if not board[r][c]:
            board[r][c] = random.choice(['b_shi', 'b_xiang', 'b_bing'])

    sparse_board = []
    for r in range(10):
        for c in range(9):
            if board[r][c]:
                sparse_board.append(f"{r},{c},{board[r][c]}")

    puzzles.append({
        "id": i + 1,
        "name": name,
        "desc": desc,
        "board": sparse_board
    })

with open('/workspace/puzzles.json', 'w', encoding='utf-8') as f:
    json.dump(puzzles, f, ensure_ascii=False)
