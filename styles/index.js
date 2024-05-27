const charList=["БЕЗНОГNM","И1 SINGAQ","РУКИ","ДОСМОТ","v1","o5","u2","ШИМ","НЕ ДУМАNTE","НЕ БОЙТЕСЬ","卐","卍","ꏢ","ꑭ", "v1 o5 u2"];

function generateRune() {
    const center = document.querySelector(".center");
    const rune = document.createElement("a");
    const char = charList[Math.floor(Math.random()*charList.length)];
    
    const centerRect = center.getBoundingClientRect(); // Получаем координаты и размеры элемента .center
    
    // Генерация случайных координат с учетом размеров элемента .center и отступа в 20 пикселей
    const x = Math.floor(Math.random()*(window.innerWidth - centerRect.width - 40)) + 20;
    const y = Math.floor(Math.random()*(window.innerHeight - centerRect.height - 40)) + 20;
    
    let fadeInOutTime = Math.floor(5e3*Math.random())+1e3;
    
    rune.textContent = char;
    rune.classList.add("rune");
    rune.style.top = `${y}px`;
    rune.style.left = `${x}px`;
    rune.style.opacity = "0";
    
    document.getElementById("runic-characters").appendChild(rune);
    
    let opacity = 0;
    let fadeInInterval = setInterval(() => {
        opacity += 0.01;
        rune.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(fadeInInterval);
            setTimeout(() => {
                let fadeOutInterval = setInterval(() => {
                    opacity -= 0.01;
                    rune.style.opacity = opacity;
                    if (opacity <= 0) {
                        clearInterval(fadeOutInterval);
                        rune.remove();
                    }
                }, 10);
            }, fadeInOutTime);
        }
    }, 10);
    
    // Проверяем пересечение руны с элементом .center и, если они пересекаются, удаляем руну и генерируем новую
    if (
        x < centerRect.right && 
        x + rune.offsetWidth > centerRect.left && 
        y < centerRect.bottom && 
        y + rune.offsetHeight > centerRect.top
    ) {
        rune.remove();
        generateRune();
    }
}

setInterval(() => {
    generateRune();
}, 750);
