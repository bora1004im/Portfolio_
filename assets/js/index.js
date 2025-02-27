/*main*/
window.addEventListener("scroll", function() {
    let scrollY = window.scrollY;
    let circle = document.querySelector(".container01 .circle.large");

    let moveX = scrollY * 0.05;  // 스크롤 값의 5% 만큼 오른쪽 이동
    let moveY = scrollY * 0.03;  // 스크롤 값의 3% 만큼 위로 이동

    circle.style.transform = `translate(${moveX}px, -${moveY}px)`;
});

/*about-text*/
document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.querySelector(".container02 .right-text p"); 
    const text = "Designer &\nPublisher"; // 줄 바꿈 처리
    let index = 0;
    let hasAnimated = false; // 애니메이션이 실행되었는지 확인하는 변수

    function typeText() {
        if (index < text.length) {
            if (text[index] === "\n") {
                textElement.innerHTML += "<br>"; // 줄바꿈 적용
            } else {
                textElement.innerHTML += text[index]; // 한 글자씩 추가
            }
            index++;
            setTimeout(typeText, 150); // 타이핑 속도 조절
        } else {
            textElement.style.borderRight = "none"; // 다 쓰면 커서 없애기
        }
    }

    function checkScroll() {
        const section = document.querySelector(".container02");
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.8 && !hasAnimated) { 
            hasAnimated = true; // 한 번만 실행되도록 설정
            textElement.innerHTML = ""; // 초기화
            typeText(); // 실행
            window.removeEventListener("scroll", checkScroll); // 이벤트 제거
        }
    }

    window.addEventListener("scroll", checkScroll); // 스크롤 이벤트 등록
    checkScroll(); // 초기 체크 (혹시 이미 보일 수도 있으니까)
});

/*skill*/
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("skillCanvas");
    const ctx = canvas.getContext("2d");
    const skillPercentage = document.querySelector(".skill-percentage");
    const skillDescription = document.querySelector(".skill-description");
    const skillItems = document.querySelectorAll(".skill-text ul li");

    canvas.width = 400;
    canvas.height = 400;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 140;
    let currentPercentage = 0;
    let targetPercentage = 90;
    let animationFrame;

    const skills = [
        { percent: 90, desc: "포토샵을 활용한 다양한 그래픽 작업이 가능합니다." },
        { percent: 80, desc: "인포그래픽 및 다이어그램 제작이 가능합니다." },
        { percent: 85, desc: "UI/UX 디자인 및 프로토타이핑이 가능합니다." },
        { percent: 90, desc: "반응형 웹 및 스타일링을 능숙하게 다룰 수 있습니다." },
        { percent: 75, desc: "JavaScript를 활용한 인터랙티브 기능 구현이 가능합니다." },
        { percent: 60, desc: "JQuery 기반의 AJAX 활용 및 UI 구성 경험이 있습니다." },
        { percent: 50, desc: "PHP를 사용한 서버 유지보수 및 코드 수정이 가능합니다." }
    ];

    function drawCircle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 12;

        // 배경 원 (전체 100%)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "#E0E0E0";
        ctx.stroke();

        // 진행 원 (현재 % 만큼)
        ctx.beginPath();
        ctx.strokeStyle = "#000"; 
        ctx.arc(centerX, centerY, radius, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * (currentPercentage / 100)));
        ctx.stroke();

        skillPercentage.textContent = `${Math.floor(currentPercentage)}%`; 

        if (currentPercentage < targetPercentage) {
            currentPercentage += 1; 
            animationFrame = requestAnimationFrame(drawCircle);
        }
    }

    skillItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            skillItems.forEach(el => el.classList.remove("active"));
            item.classList.add("active");

            targetPercentage = skills[index].percent;
            skillDescription.textContent = skills[index].desc;
            currentPercentage = 0;

            cancelAnimationFrame(animationFrame);
            drawCircle();
        });
    });

    skillItems[0].classList.add("active");
    skillDescription.textContent = skills[0].desc;

    drawCircle(); 
});

/*li-click*/
document.querySelectorAll(".skill-text li").forEach((item) => {
    item.addEventListener("click", function () {
        // 기존 활성화된 li에서 active 클래스 제거
        document.querySelectorAll(".skill-text li").forEach(el => el.classList.remove("active"));

        // 클릭한 li에 active 클래스 추가
        this.classList.add("active");
    });
});
