//hero.html script
const form = document.forms['hero'];
form.addEventListener('submit',validate,false);
form.addEventListener('submit', makeHero, false);

function makeHero(event) {

    event.preventDefault(); // prevent the form from being submitted

    const hero = {}; // create an empty object

    hero.name = form.heroName.value; // create a name property based on the input field's value

    hero.realName = form.realName.value;

    hero.powers = [];
    for (let i=0; i < form.powers.length; i++) {
        if (form.powers[i].checked) {
            hero.powers.push(form.powers[i].value);
        }
    }

    hero.powers = [...form.powers].filter(box => box.checked).map(box => box.value);

    hero.category = form.category.value;

    hero.age = form.age.value;

    hero.city = form.city.value;

    hero.origin = form.origin.value;

    alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
    return hero;
}

function validate(event) {
    const firstLetter = form.heroName.value[0];
    if (firstLetter.toUpperCase() === 'X') {
        event.preventDefault();
        alert('Your name is not allowed to start with X!');
    }
}