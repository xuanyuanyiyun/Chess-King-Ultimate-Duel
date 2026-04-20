import re

def process_readme():
    with open('/workspace/README.md', 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace "游戏" related terms
    content = content.replace('网页游戏', '网页作品')
    content = content.replace('获取游戏', '获取作品')
    content = content.replace('启动游戏', '启动作品')
    content = content.replace('游玩', '体验')
    content = content.replace('游戏', '作品')
    
    # Add the 9 levels section before "## 🚀 运行与使用方法"
    levels_section = """## 🏆 象棋王九大段位等级系统

为了在对决中彰显实力与成长，本作品特别设计了 **9 个科幻与传统结合的段位等级**：

1. **见习棋士 (Apprentice)**：初入博弈盒，掌握基础棋力与规则。
2. **新锐先锋 (Vanguard)**：锋芒毕露，初窥绝招释放门径。
3. **破局精英 (Breaker)**：突破常规，善于在绝境残局中寻找生机。
4. **运筹大师 (Tactician)**：掌控全盘，对 SP 能量的运用收放自如。
5. **幻影宗师 (Phantom)**：棋风诡谲，进退如幻影般难以捉摸。
6. **雷霆棋尊 (Thunder)**：攻势如雷，大招释放精准且致命。
7. **领域棋圣 (Domain)**：绝对领域，在全息棋盘上建立自己的法则。
8. **神枢天网 (Nexus)**：算无遗策，拥有堪比最高级 AI 的推演能力。
9. **象棋王 (Xiangqi King)**：登峰造极，人机合一的最高境界。

---

"""
    
    content = content.replace("## 🚀 运行与使用方法", levels_section + "## 🚀 运行与使用方法")

    with open('/workspace/README.md', 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("README.md processed successfully.")

if __name__ == '__main__':
    process_readme()
