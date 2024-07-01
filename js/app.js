window.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent(){
        tabsContent.forEach((tab)=> {
            tab.classList.add('hide')
            tab.classList.remove('show', 'fade') 
        })
        
        tabs.forEach( tab => {
            tab.classList.remove('tabheader__item_active')
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide') 
        tabs[i].classList.add('tabheader__item_active')
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target

        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })
    
    //Timer

    const deadLine = '2024-08-25';

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24  )),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }


    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000)
        
        updateClock()
        
        function getZero(num){
            if (num < 10){
                return ('0' + num)
            }else {
                return num
            }
        }
        
        function updateClock(){
            const t = getTimeRemaining(endtime)
            
            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)

            if (t.total <= 0) {
                clearInterval(timeInterval)
                days.innerHTML = '00'
                hours.innerHTML = '00'
                minutes.innerHTML = '00'
                seconds.innerHTML = '00'
            }
        }


    }
    setClock('.timer', deadLine)


    // Modal Window

    const firstBtn = document.querySelector('.btn_white'),
          secondBtn = document.querySelector('.btn_dark')
          
    let modal = document.querySelector('.modal'),
        modal_close = modal.querySelector('.modal__close')

    firstBtn.addEventListener('click', showModal)
    secondBtn.addEventListener('click', showModal)
    
    

    modal_close.addEventListener('click', hideModal)

    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal()
    })

    function hideModal(){
        modal.style.display = 'none'
        document.body.style.overflow = ''
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display === 'block') hideModal()
    })

    const timerModal = setTimeout(showModal, 6000)

    function showModalScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal()
            window.removeEventListener('scroll', showModalScroll)
        }
    }

    window.addEventListener('scroll', showModalScroll)

    function showModal(){
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        clearInterval(timerModal)
    }
});

