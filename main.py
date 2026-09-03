import datetime
import sys

def get_greeting():
    hour = datetime.datetime.now().hour
    if 5 <= hour < 12:
        return "☕ Доброе утро, Алик!"
    elif 12 <= hour < 18:
        return "⚡ Добрый день, Алик!"
    elif 18 <= hour < 23:
        return "🌙 Добрый вечер, Алик!"
    else:
        return "🌌 Доброй ночи, Алик!"

def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')

    greeting = get_greeting()

    # ANSI Палитра Вайбкодера
    CYAN = "\033[96m"
    MAGENTA = "\033[95m"
    PURPLE = "\033[35m"
    YELLOW = "\033[93m"
    GREEN = "\033[92m"
    BLUE = "\033[94m"
    BOLD = "\033[1m"
    RESET = "\033[0m"

    laptop_ascii = f"""
{CYAN}          ┌───────────────────────────────────────────────────┐
          │ {MAGENTA}alik@vibe-laptop: ~/vibes{CYAN}                         │
          ├───────────────────────────────────────────────────┤
          │  {GREEN}> PRINT("HELLO WORLD!"){CYAN}                          │
          │  {YELLOW}> {greeting:<46}{CYAN} │
          │  {BLUE}> COFFEE LEVEL: [████████████] 100%{CYAN}              │
          │  {GREEN}> BUGS DETECTED: 0 | VIBE: 100%                      {CYAN}│
          │                                                   │
          │         {MAGENTA}{BOLD}✨  УГОЛОК ВАЙБКОДЕРА АЛИКА  ✨{RESET}{CYAN}           │
          │                                                   │
          └───────────────────────────────────────────────────┘
         =======================================================
        /  [Esc] [F1] [F2] [F3] [F4] [F5] [F6] [F7] [F8]  [Del] \\
       /   [~] [1] [2] [3] [4] [5] [6] [7] [8] [9] [0] [-] [=]  \\
      /    [Tab] [Q] [W] [E] [R] [T] [Y] [U] [I] [O] [P]       \\
     /     [Caps] [A] [S] [D] [F] [G] [H] [J] [K] [L] [Enter]   \\
    /      [Shift]  [Z] [X] [C] [V] [B] [N] [M]   [Shift]      \\
   /       [Ctrl] [Alt] [═══ SPACE VIBE ═══] [Alt] [Ctrl]      \\
  /                                                             \\
 ┌───────────────────────────────────────────────────────────────┐
 │                       [   TOUCHPAD   ]                        │
 └───────────────────────────────────────────────────────────────┘{RESET}
"""

    dog_ascii = f"""
{YELLOW}
                  / \\__
                 (    @\\___   🐶 ВЕРНЫЙ КОДИНГ-ПЁС АЛИКА 🐶
                 /         O  "Гав! Код проверен, багов 0,
                /   (_____/    вайб зашкаливает!"
               /─────/
              /   /   \\ 
             /   / \\   \\
            /   /   \\   \\
           (___)     (___){RESET}
"""

    print(laptop_ascii)
    print(dog_ascii)
    print(f"{BOLD}{PURPLE}  > Ноутбук и Кодинг-Пёс готовы! Открой index.html в браузере.{RESET}\n")

if __name__ == "__main__":
    main()
