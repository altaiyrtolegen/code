import datetime
import sys
import random

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

def get_laptop_art(greeting):
    CYAN = "\033[96m"
    WHITE = "\033[97m"
    BLUE = "\033[94m"
    GREEN = "\033[92m"
    BOLD = "\033[1m"
    RESET = "\033[0m"

    return f"""
{BLUE}          ┌───────────────────────────────────────────────────┐
          │ {WHITE}alik@vibe-laptop: ~/navy-vibes{BLUE}                     │
          ├───────────────────────────────────────────────────┤
          │  {CYAN}> PRINT("NAVY BLUE & WHITE CRYSTAL CODE")            {BLUE}│
          │  {WHITE}> {greeting:<46}{BLUE} │
          │  {CYAN}> COFFEE LEVEL: [████████████] 100%{BLUE}              │
          │  {GREEN}> BUGS DETECTED: 0 | NAVY VIBE: 100%               {BLUE}│
          │                                                   │
          │         {WHITE}{BOLD}❄️  УГОЛОК ВАЙБКОДЕРА АЛИКА  ❄️{RESET}{BLUE}           │
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

def get_dog_art():
    WHITE = "\033[97m"
    CYAN = "\033[96m"
    RESET = "\033[0m"
    return f"""
{WHITE}
                  / \\__
                 (    @\\___   🐶 ВЕРНЫЙ КОДИНГ-ПЁС АЛИКА 🐶
                 /         O  {CYAN}"Гав! Тёмно-синий стиль активирован,
                /   (_____/    багов 0!"{WHITE}
               /─────/
              /   /   \\ 
             /   / \\   \\
            /   /   \\   \\
           (___)     (___){RESET}
"""

def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')

    greeting = get_greeting()
    CYAN = "\033[96m"
    WHITE = "\033[97m"
    BLUE = "\033[94m"
    BOLD = "\033[1m"
    RESET = "\033[0m"

    print(get_laptop_art(greeting))
    print(get_dog_art())

    quotes = [
        "Глубокий синий Navy и чистый белый — идеальная гармония для ума вайбкодера.",
        "Код — это искусство. Если писать его с душой, багам просто не останется места.",
        "100% кофеина + 0% багов = идеальный день вайбкодера."
    ]

    print(f"{BOLD}{WHITE}  💡 Цитата дня: \"{random.choice(quotes)}\"{RESET}")
    print(f"{BOLD}{CYAN}  ❄️ Тёмно-синяя версия проекта готова! Открой index.html в браузере.{RESET}\n")

if __name__ == "__main__":
    main()
