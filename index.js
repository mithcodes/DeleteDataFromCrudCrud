document.addEventListener('DOMContentLoaded', function () {

    axios.get('https://crudcrud.com/api/9e3ec5db431c44a68fd6cb3319e4ffdd/mentdata')
        .then(function (response) {

            const existingData = response.data;

            displayData(existingData);
        })
        .catch(function (error) {
            // Handle errors
            console.error('Error fetching existing data:', error);
        });
});

const submit = document.getElementById('submit');
const name = document.getElementById('name');
const phone = document.getElementById('phone');
const address = document.getElementById('address');
const div = document.getElementById('div');

submit.addEventListener('click', function () {
    const data = {
        name: name.value,
        phone: phone.value,
        address: address.value
    };

    const list = document.createElement('li');
    list.textContent = `${data.name}, ${data.phone}, ${data.address}`;

    const remove = document.createElement('button');
    remove.textContent = 'remove';
    remove.addEventListener('click', function () {
        
        const userId = data._id; 
        deleteUserData(userId, list);
    });

    list.appendChild(remove);
    div.appendChild(list);

    
    axios.post('https://crudcrud.com/api/9e3ec5db431c44a68fd6cb3319e4ffdd/mentdata', data)
        .then(function (response) {
            
            console.log('Data submitted successfully:', response.data);
            
            data._id = response.data._id;
        })
        .catch(function (error) {
            
            console.error('Error submitting data:', error);
        });
});

function displayData(data) {
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const list = document.createElement('li');
        list.textContent = `${item.name}, ${item.phone}, ${item.address}`;

        const remove = document.createElement('button');
        remove.textContent = 'remove';
        remove.addEventListener('click', function () {
            // Handle the delete operation on the server
            deleteUserData(item._id, list);
        });

        list.appendChild(remove);
        div.appendChild(list);
    }
}

function deleteUserData(userId, listItem) {
    
    axios.delete(`https://crudcrud.com/api/9e3ec5db431c44a68fd6cb3319e4ffdd/mentdata/${userId}`)
        .then(function (response) {
            
            console.log('Data deleted successfully:', response.data);
            
            div.removeChild(listItem);
        })
        .catch(function (error) {
            // Handle errors
            console.error('Error deleting data:', error);
        });
}
