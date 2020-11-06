const fromBox = document.querySelector('.formBox');
openAdd = () => {
    if(fromBox.style.display === 'none')
        fromBox.style.display = 'block';
    else fromBox.style.display = 'none';
}