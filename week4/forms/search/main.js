//search.html script
const form = document.forms['search'];
//const [input,button] = form.elements;
form.action = '/an/other.url'

const input = form.elements.searchInput;
input.value = 'Search Here';

input.addEventListener('focus', () => console.log('focused'), false);
input.addEventListener('blur', () => console.log('blurred'), false);
input.addEventListener('change', () => console.log('changed'), false);

input.addEventListener('focus', function(){
    if (input.value==='Search Here') {
        input.value = '' 
    }
}, false);

input.addEventListener('blur', function(){
    if(input.value === '') {
        input.value = 'Search Here';
    } 
}, false);

form.addEventListener ('submit', search, false);
function search(event) {
    alert(`You searched for: ${input.value}`);
    event.preventDefault();
}
