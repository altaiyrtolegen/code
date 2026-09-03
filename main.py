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
    BOLD = "\033[1m"
    RESET = "\033[0m"

    title_art = f"""
{MAGENTA}{BOLD}┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    ✨ ✨  У Г О Л О К   В А Й Б К О Д Е Р А   А Л И К А  ✨ ✨ │
│                                                             │
└─────────────────────────────────────────────────────────────┘{RESET}"""

    bio_box = f"""{CYAN}┌── [ ПРОФИЛЬ: 18-ЛЕТНИЙ CS СТУДЕНТ & ВАЙБКОДЕР ] ────────────┐
│ {GREEN}{greeting:<57}{CYAN} │
│ {YELLOW}🎓 Статус: 18 лет, студент Computer Science                   {CYAN}│
│ {MAGENTA}💻 Стек: Python, JS/TS, C++, HTML/CSS, Git, Linux           {CYAN}│
│ {CYAN}💡 Девиз: "Пиши код так, чтобы сам кайфовал от процесса"    {CYAN}│
│ {GREEN}🎵 Настроение: Кодим пет-проекты под lo-fi / synthwave      {CYAN}│
└─────────────────────────────────────────────────────────────┘{RESET}"""

    print(title_art)
    print(bio_box)
    print(f"\n{BOLD}{PURPLE}  > Открой index.html в браузере для полного интерактивного вайба!{RESET}\n")

if __name__ == "__main__":
    main()
