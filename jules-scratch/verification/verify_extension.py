from playwright.sync_api import sync_playwright
import os
import sys

def run(playwright):
    # Указываем путь к текущей директории, где находятся файлы расширения
    crx_path = os.path.abspath('.')
    user_data_dir = "/tmp/playwright-user-data-sync"

    # Запускаем браузер с установленным расширением
    context = playwright.chromium.launch_persistent_context(
        user_data_dir,
        headless=True,
        args=[
            f"--disable-extensions-except={crx_path}",
            f"--load-extension={crx_path}",
        ],
    )
    page = context.new_page()

    try:
        # Переходим на Google Календарь
        print("Перехожу на https://calendar.google.com/...")
        page.goto("https://calendar.google.com/", timeout=60000)

        # Ожидаем, пока контент-скрипт добавит кастомный элемент на страницу
        print("Ожидаю появления элемента 'gcalize-setteing'...")
        page.wait_for_selector("gcalize-setteing", timeout=30000)
        print("Элемент 'gcalize-setteing' найден.")

        # Открываем диалоговое окно настроек, вызывая метод toggle() на кастомном элементе
        print("Открываю диалоговое окно настроек...")
        page.evaluate("document.querySelector('gcalize-setteing').toggle()")

        # Ожидаем, пока диалоговое окно станет видимым
        print("Ожидаю открытия диалогового окна...")
        page.wait_for_selector("gcalize-setteing .dialog[open]", timeout=10000)
        print("Диалоговое окно настроек открыто.")

        # Делаем скриншот
        screenshot_path = "jules-scratch/verification/verification.png"
        page.screenshot(path=screenshot_path)
        print(f"Скриншот успешно сохранен в {screenshot_path}")

    except Exception as e:
        print(f"Произошла ошибка: {e}", file=sys.stderr)
        # В случае ошибки сохраняем HTML страницы для отладки
        try:
            html = page.content()
            error_html_path = "jules-scratch/verification/error.html"
            with open(error_html_path, "w") as f:
                f.write(html)
            print(f"HTML страницы ошибки сохранен в {error_html_path}")
        except Exception as html_e:
            print(f"Не удалось сохранить содержимое страницы: {html_e}", file=sys.stderr)
        # Завершаем выполнение с ошибкой
        sys.exit(1)

    finally:
        context.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
