document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        country: document.getElementById('country').value,
        hobby: document.getElementById('hobby').value,
    };

    if (!formData.name || !formData.age || !formData.country || !formData.hobby) {
        alert('All fields are required!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Form submitted successfully!');
            document.getElementById('form').reset();
        } else {
            const errorMessage = await response.text();
            alert(`Failed to submit the form: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form.');
    }
});

document.getElementById('update-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('update-id').value;
    const age = document.getElementById('update-age').value;

    if (!id || !age) {
        alert('Both ID and new age are required!');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ age }),
        });

        if (response.ok) {
            alert('Age updated successfully!');
            document.getElementById('update-form').reset();
        } else {
            const errorMessage = await response.text();
            alert(`Failed to update the age: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error updating age:', error);
        alert('An error occurred while updating the age.');
    }
});
