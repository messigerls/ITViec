let display = true;

const desPage = document.querySelector('#des');
const reviewPage = document.querySelector('#review');
reviewPage.style.display = 'none'


const openPage = (value) => {
    if(value === 'des'){
        desPage.style.display = '';
        reviewPage.style.display = 'none';
    }
    if(value === 'review') {
        desPage.style.display = 'none';
        reviewPage.style.display = '';
    }
}