<div align="center">
    <h1>EasyConcertKorea</h1>
<br>
</div>

텔레그램 및 결제정보 설정 방법
텔레그램
1. https://blog.naver.com/lifelectronics/223198582215
2. 위 링크 [2. 텔레그램에서 botfather을 통해 bot 만들기 부터 진행]
3. scripts\melonticket\seat.js 로 들어가서
4. sendTelegramMessage 함수 검색 후 
    const BOT_TOKEN = "{BOT_TOKEN}";
    const CHAT_ID = "{CHAT_ID}";
    위 {} 칸 안에 2번에서 생성한 봇 토큰과 챗 아이디를 넣어줌
결제정보
1. scripts\melonticket\seat.js 로 들어가서
2. fillPaymentInfo 함수 검색 후
3. 무통장 입금 할 bankSelect.value = "은행번호" 입력
4. 1234-5678 부분에 전화번호 입력
    frame.document.getElementById("cashReceiptRegTelNo2").value = "1234";
    frame.document.getElementById("cashReceiptRegTelNo3").value = "5678";
5. Ctrl + s 눌러서 저장

사용방법
1. chrome://extensions/ -> 압축해제된 확장 프로그램 로드
2. mt 폴더 선택
3. 구글 검색바 왼쪽 확장 프로그램(퍼즐모양)에서 추가한 EasyConcertKorea 클릭
4. Melon Ticket 선택 후 콘서트명, 콘서트 ID(해당 콘서트 주소 맨 왼쪽에 숫자), 매수, Sections(예매 하고싶은 콘서트 구역을 입력하면 됨)
5. Submit
6. 생성된 메뉴 클릭 시 해당 콘서트 멜론티켓 홈페이지로 이동
7. 로그인
8. 예매하기 버튼 클릭 후 자동입력방지 문자 치고 자리 잡을 떄까지 기다리면 텔레그램 알림이 옴
9. 알림오면 해당 예매창에 "선택하신 좌석등급과 가격이 맞는지 확인해주세요" 확인만 눌러주면 결제까지 자동으로 완료 됨



## :notebook: Description :notebook:

This Chrome extension streamlines the process of finding and booking concert tickets on popular Korean platforms. such as <a href="https://tkglobal.melon.com/main/index.htm?langCd=EN">Melon Ticket</a>, <a href="http://ticket.yes24.com/English">Yes24</a> and <a href="https://www.globalinterpark.com/?lang=en">Interpark</a>. The extension includes a user-friendly popup with the ability to register for automatic booking. Once a concert page is opened, the extension automates the process, ensuring a hassle-free experience in securing a seat for the event.

> [!NOTE]
> This extension is designed for use on the global versions of the platforms and may not be compatible with the Korean versions.

## :cd: Usage :cd:

- Clone the repository.
- Load the extension in Chrome via `chrome://extensions/` and select "Load unpacked."
- Open the extension popup and register for automatic booking on the global versions of Melon Ticket, Yes24, and Interpark.
- Upon visiting a supported concert page on the global version of the platforms, the extension automates the booking process.

> [!CAUTION]
> Using this extension for automated booking may lead to a ban on the respective platforms. It is important to note that the developers of this extension are not responsible for any account bans or consequences that may arise from using the automated booking feature. Use at your own discretion.

## Development

### Popup and Form
- `form`: HTML, CSS, and JavaScript for the main popup form.
- `interparkForm`, `melonticketForm`, `yes24Form`: Platform-specific registration forms.
- `mainPage`: HTML, CSS, and JavaScript for the main extension popup.

### Script for Auto Booking
- `melonticket`, `yes24`, `interpark `: JavaScript logic for executing auto booking on each site.
- `common`: Utility scripts shared across platforms.

## :camera_flash: Demo video :camera_flash:

![Demo of the chrome extension](./assets/demo.gif)

## Credits

* <strong><a href="https://github.com/BastienBoymond">Bastien Boymond</a></strong>
