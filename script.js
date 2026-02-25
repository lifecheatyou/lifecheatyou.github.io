document.addEventListener('DOMContentLoaded', () => {
    const hotspot = document.getElementById('book-hotspot');
    const introScreen = document.getElementById('intro');
    const mapScreen = document.getElementById('map-view');
    const overlay = document.getElementById('transition-overlay');

    hotspot.addEventListener('click', (e) => {
        e.stopPropagation();

        // 1. 책 클릭 애니메이션 트리거
        // 'open' 클래스를 추가하여 번짐(glow/flash) 애니메이션 작동
        hotspot.classList.add('open');

        // 2. 배경 스케일 업 애니메이션 추가로 몰입감 부여
        const bg = document.querySelector('.intro-bg');
        if (bg) {
            // override the slow breathing animation with a fast zoom
            bg.style.animation = 'none';
            bg.style.transform = 'scale(1.5)';
            bg.style.transition = 'transform 1.5s ease-in';
        }

        // 3. 오버레이 페이드 인 (화면 전환 연출)
        setTimeout(() => {
            overlay.classList.add('fade-in');

            // 4. 화면 교체
            setTimeout(() => {
                introScreen.classList.remove('active');
                mapScreen.classList.add('active');

                // 5. 오버레이 페이드 아웃
                setTimeout(() => {
                    overlay.classList.remove('fade-in');
                    hotspot.classList.remove('open');
                }, 500); // Wait for screen state to settle
            }, 1000); // Wait for overlay to fully cover
        }, 800); // Delay before overlay starts (wait for glow to expand)
    });

    // 맵 핀들에 클릭 효과 (옵션)
    const pins = document.querySelectorAll('.map-pin');
    pins.forEach(pin => {
        pin.addEventListener('click', (e) => {
            // let normal <a> behavior handle the new tab linking, 
            // but we can add an interaction feedback here.
            pin.style.transform = 'scale(0.9)';
            setTimeout(() => {
                pin.style.transform = '';
            }, 150);
        });
    });
});
