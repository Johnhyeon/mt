async function sleep(t) {
    return await new Promise(resolve => setTimeout(resolve, t));
}

function theFrame() {
    if (window._theFrameInstance == null) {
      window._theFrameInstance = document.getElementById('oneStopFrame').contentWindow;
    }
  
    return window._theFrameInstance;
}

function getConcertId() {
    return document.getElementById("prodId").value;
}

function openEverySection() {
    let frame = theFrame();
    let section = frame.document.getElementsByClassName("seat_name");
    console.log(section);
    for (let i = 0; i < section.length; i++) {
        section[i].parentElement.click();
    }
}

function clickOnArea(area) {
    let frame = theFrame();
    let section = frame.document.getElementsByClassName("area_tit");
    for (let i = 0; i < section.length; i++) {
        console.log(section[i], area);
        if (section[i].innerHTML.includes(area)) {
            section[i].parentElement.click();
            return;
        }
    }
}

async function findSeat() {
    let frame = theFrame();
    let canvas = frame.document.getElementById("ez_canvas");
    let seat = canvas.getElementsByTagName("rect");
    console.log(seat);
    await sleep(750);
    for (let i = 0; i < seat.length; i++) {
        let fillColor = seat[i].getAttribute("fill");
    
        // Check if fill color is different from #DDDDDD or none
        if (fillColor !== "#DDDDDD" && fillColor !== "none") {
            console.log("Rect with different fill color found:", seat[i]);
            var clickEvent = new Event('click', { bubbles: true });

            seat[i].dispatchEvent(clickEvent);
            await sleep(1000);
            frame.document.getElementById("nextTicketSelection").click();
            
            sendTelegramMessage("🎟 좌석 선택 완료! 5분 이내 결제 요망!!!");
            
            await sleep(1000);
            await selectTicketQuantityAndProceed(frame);

            await sleep(1500); 
            await fillPaymentInfo(frame);
            sendTelegramMessage("🎟 무통장결제 완료! 24시간 이내 입금 요망!!!");

            return true;
        }
    }
    return false;
}

// 수량 선택 및 결제단계로 넘어가기
async function selectTicketQuantityAndProceed(frame) {
    try {
        // 수량 select box 찾기
        const selectBox = frame.document.querySelector('select[name^="volume_"]');
        if (selectBox) {
            selectBox.value = "1";

            // onchange 트리거 호출
            const changeEvent = new Event("change", { bubbles: true });
            selectBox.dispatchEvent(changeEvent);

            await sleep(300);

            // 다음 단계로 (결제 화면)
            const nextButton = frame.document.getElementById("nextPayment");
            if (nextButton) {
                nextButton.click();
            } else {
                console.warn("❗ nextPayment 버튼을 찾을 수 없음");
            }
        } else {
            console.warn("❗ 티켓 수량 select 요소를 찾지 못함");
        }
    } catch (e) {
        console.error("❗ 수량 선택 또는 다음 단계로 이동 중 오류:", e);
    }
}

function sendTelegramMessage(message) {
    const BOT_TOKEN = "{BOT_TOKEN}";
    const CHAT_ID = "{CHAT_ID}";
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => console.log("Telegram message sent:", data))
    .catch(error => console.error("Error sending Telegram message:", error));
}

async function fillPaymentInfo(frame) {
    try {
        // 1. 무통장입금 선택
        const payMethodRadio = frame.document.getElementById("payMethodCode003");
        if (payMethodRadio) {
            payMethodRadio.checked = true;
            payMethodRadio.click(); // onclick 이벤트 발생
        }

        await sleep(300);

        // 2. 입금은행 선택  
        // value="03">기업은행
        // value="04">국민은행
        // value="11">농협은행
		// value="81">하나은행
		// value="20">우리은행
		// value="88">신한은행
		// value="39">경남은행
		// value="71">우체국
		// value="32">부산은행
		// value="31">대구은행
        const bankSelect = frame.document.querySelector('select[name="bankCode"]');
        if (bankSelect) {
            bankSelect.value = "04"; // 국민은행
            bankSelect.dispatchEvent(new Event("change", { bubbles: true }));
        }

        await sleep(300);

        // 3. 휴대폰번호 입력 (010-1234-5678)
        frame.document.querySelector('select[name="cashReceiptRegTelNo1"]').value = "010";
        frame.document.getElementById("cashReceiptRegTelNo2").value = "1234";
        frame.document.getElementById("cashReceiptRegTelNo3").value = "5678";

        // 4. 전체 동의 체크
        const agreeAll = frame.document.getElementById("chkAgreeAll");
        if (agreeAll && !agreeAll.checked) {
            agreeAll.click();
        }

        await sleep(300);

        // 5. 결제하기 버튼 클릭
        const payButton = frame.document.getElementById("btnFinalPayment");
        if (payButton) {
            payButton.click();
        }

        console.log("💳 결제정보 입력 및 결제 시도 완료");
    } catch (e) {
        console.error("❗ 결제정보 입력 중 오류 발생:", e);
    }
}


async function checkCaptchaFinish() {
    if (document.getElementById("certification").style.display != "none") {
        await sleep(1000);
        checkCaptchaFinish();
        return;
    }
    let frame = theFrame();
    await sleep(500);
    frame.document.getElementById("nextTicketSelection").click();
    return;
}

async function reload() {
    let frame = theFrame();
    frame.document.getElementById("btnReloadSchedule").click();
    await sleep(750);
}

async function searchSeat(data) {
    for (sec of data.section) {
        openEverySection();
        clickOnArea(sec);
        if (await findSeat()) {
            checkCaptchaFinish();
            return;
        }
    }
    reload();
    await searchSeat(data);
}

async function waitFirstLoad() {
    let concertId = getConcertId();
    let data = await get_stored_value(concertId);
    await sleep(1000);
    searchSeat(data);
}

waitFirstLoad();