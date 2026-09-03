import datetime
import sys

def get_greeting():
    hour = datetime.datetime.now().hour
    if 5 <= hour < 12:
        return "Доброе утро"
    elif 12 <= hour < 18:
        return "Добрый день"
    elif 18 <= hour < 23:
        return "Добрый вечер"
    else:
        return "Доброй ночи"

def main():
    # Настройка UTF-8 для вывода в консоли Windows
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')

    greeting_time = get_greeting()
    
    # ANSI цветные коды для стилизации вывода в консоли
    BLUE = "\033[94m"
    CYAN = "\033[96m"
    GREEN = "\033[92m"
    GOLD = "\033[93m"
    RESET = "\033[0m"
    BOLD = "\033[1m"

    border = f"{CYAN}★" + "═" * 46 + f"★{RESET}"
    
    print("\n" + border)
    print(f"{BOLD}{GOLD}          👋 ДОБРО ПОЖАЛОВАТЬ! 👋{RESET}")
    print(border)
    print(f"  {GREEN}{greeting_time}! Рады видеть вас.{RESET}")
    print(f"  {BLUE}Желаем продуктивного и отличного дня! ✨{RESET}")
    print(border + "\n")

if __name__ == "__main__":
    main()

