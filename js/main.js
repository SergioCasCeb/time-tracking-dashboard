const filterBtns = document.querySelectorAll('.filter');
const timeContainers = document.querySelectorAll('.time-container');

//Populate the time containers with the default selected filter
function checkFilterType() {
    filterBtns.forEach(filter => {
        if(filter.checked) {
            getTime(filter.value);
        }
    })
}

//Update the time container when a filter is selected
filterBtns.forEach(filter => { 
    filter.addEventListener('change', () => {
        getTime(filter.value);
    })
});

//Fetch the data from the json file and populate the cards with the time data
async function getTime(filter) {
    if(!filter) {
        filter = 'daily';
    }
    try {
        const res = await fetch('/data.json');
        const categories = await res.json();

        categories.forEach(category => {
            timeContainers.forEach(container => {
                if(category.title.toLowerCase() === container.dataset.category) {
                    container.textContent = category.timeframes[filter].current;
                    container.parentElement.nextElementSibling.textContent = `Last ${filter} - ${category.timeframes[filter].previous}hrs`;
                }
            })
        });

    } catch (err) {
        console.error(err);
    }
}

checkFilterType();