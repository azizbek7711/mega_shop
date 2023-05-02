var $ = el => document.querySelector(el),
$$ = els => document.querySelectorAll(els);

const sliderr = $('.slides'),
slidess = Array.from($$('.slidee'));

Slider('.slider-indicatorss span', sliderr, slidess, -$('.slidee').clientWidth)

function Slider(circleBall, slider, slides, ww){
    let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0
    if(circleBall){
        Array.from($$(circleBall)).forEach((circle, index) => {
            circle.addEventListener('click', () => {
                for (let i = 0; i < Array.from($$(circleBall)).length; i++) {
                    $$(circleBall)[i].classList.remove('activee')
                }
                currentIndex = index
                currentTranslate = currentIndex * ww
                prevTranslate = currentTranslate
                $$(circleBall)[index].classList.add('activee')
                slider.style.transform = `translateX(${currentTranslate}px)`;
            })
        })
    }
    setInterval(()=>{
        currentIndex++
        if(currentIndex > 2) {
            currentIndex = 0
        }
        if(circleBall){    
            for (let i = 0; i < Array.from($$(circleBall)).length; i++) {
                $$(circleBall)[i].classList.remove('activee')
            }
            $$(circleBall)[currentIndex].classList.add('activee')
        }
        currentTranslate = currentIndex * ww
        prevTranslate = currentTranslate
        slider.style.transform = `translateX(${currentTranslate}px)`
    },10000)

    slides.forEach((slide, index) => {
        const slideImage = slide.querySelector('img');
        if(slideImage){
            slideImage.addEventListener('dragstart', (e) => {
                e.preventDefault();
            })
        }
        slide.addEventListener('touchstart', touchStart(index))
        slide.addEventListener('touchend', touchEnd)
        slide.addEventListener('touchmove', touchMove)

        slide.addEventListener('mousedown', touchStart(index))
        slide.addEventListener('mouseup', touchEnd)
        slide.addEventListener('mouseleave', touchEnd)
        slide.addEventListener('mousemove', touchMove)
    })
    slidess.forEach((e) => {
        e.querySelector('img').addEventListener('click', (b)=>{
            b.preventDefault()
        })
    })
    function touchStart(index){
        return function (event){
            currentIndex = index
            startPos = getPositionX(event);
            isDragging = true
            animationID = requestAnimationFrame(animation);
            slider.classList.add('grabbing');
        }
    }
    function touchEnd(){
        isDragging = false
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;
        if(movedBy < -100 && currentIndex < slides.length - 1){
            currentIndex += 1
        } 
        slider.classList.remove('grabbing');
        if(movedBy > 100 && currentIndex > 0) {
            currentIndex -= 1
        }
        if(circleBall){

            for (let i = 0; i < Array.from($$(circleBall)).length; i++) {
                $$(circleBall)[i].classList.remove('activee')
            }
            $$(circleBall)[currentIndex].classList.add('activee')
        }
        setPositionByIndex()

        slider.classList.remove('grabbing');
    }
    function touchMove(event) {
        if(isDragging){
            const currentPosition = getPositionX(event)
            currentTranslate = prevTranslate + currentPosition - startPos
        }
    }
    function getPositionX(event){
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
    }
    function animation(){
        setSliderPosition();
        if(isDragging) requestAnimationFrame(animation)
    }
    function setSliderPosition(){
        slider.style.transform = `translateX(${currentTranslate}px)`
    }
    function setPositionByIndex(){
        currentTranslate = currentIndex * ww
        prevTranslate = currentTranslate
        setSliderPosition()
    }
}