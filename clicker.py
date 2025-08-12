import pyautogui
import time
import datetime

def click_at_specific_time(target_time_str, x, y):
    target_time = datetime.datetime.strptime(target_time_str, "%H:%M:%S").time()

    while True:
        now = datetime.datetime.now().time()

        if now >= target_time:
            pyautogui.click(x, y)
            break

        time.sleep(0.1)

# 사용 예시
if __name__ == "__main__":
    target_time_to_click = "20:00:00"
    click_x = 1600
    click_y = 950

    click_at_specific_time(target_time_to_click, click_x, click_y)