import datetime
import sys

def get_greeting():
    hour = datetime.datetime.now().hour
    if 5 <= hour < 12:
        return "☕ Доброе утро, вайбкодер!"
    elif 12 <= hour < 18:
        return "⚡ Добрый день, вайбкодер!"
    elif 18 <= hour < 23:
        return "🌙 Добрый вечер, вайбкодер!"
    else:
        return "🌌 Доброй ночи, вайбкодер!"

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

    status_box = f"""{CYAN}┌── [ СТАТУС ВАЙБА ] ─────────────────────────────────────────┐
│ {GREEN}{greeting:<57}{CYAN} │
│ {YELLOW}🎵 Настроение: Чилово программируем под lo-fi / synthwave {CYAN}│
│ {MAGENTA}🚀 Статус: Код пишется самопроизвольно и без багов        {CYAN}│
└─────────────────────────────────────────────────────────────┘{RESET}"""

    print(title_art)
    print(status_box)
    print(f"\n{BOLD}{PURPLE}  > Нажми CTRL+C для выхода или получай удовольствие от кода!{RESET}\n")

if __name__ == "__main__":
    main()
