const List = document.querySelector('#list');
const form = document.querySelector('#add-form');
const regex1 = /^[0-9]{1,}$/gi;
const regex2 = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/gi;
// create element & render page
function render(doc) {
    let li = document.createElement('li');
    let coloum1 = document.createElement('span');
    let coloum2 = document.createElement('span');
    let coloum3 = document.createElement('span');
    let cross = document.createElement('div');
    li.setAttribute('data-id', doc.id);
    coloum1.textContent = `name : ${doc.data().coloum1}`;
    coloum2.textContent = `type : ${doc.data().coloum2}`;
    coloum3.textContent = `value: ${doc.data().coloum3}`;
    cross.textContent = 'x';
    li.appendChild(coloum1);
    li.appendChild(coloum2);
    li.appendChild(coloum3);
    li.appendChild(cross);
    List.appendChild(li);

    // delete data 
    cross.addEventListener("click", (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute("data-id");
        db.collection("tables").doc(id).delete();
    });
}


// real time  getting data

db.collection('tables').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(changes => {
        console.log(changes.doc.data());
        if (changes.type == "added") {
            render(changes.doc);

        }
        else if (changes.type == "removed") {
            let li = List.querySelector("[data-id=" + changes.doc.id + "]");
            List.removeChild(li);

        }
    });
});

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(form.coloum1.value, form.coloum2.value, form.coloum3.value);
    if (form.coloum1.value != "" && form.coloum2.value != "" && form.coloum3.value != "") {
        const dropdown = form.coloum2.value;
        switch (dropdown) {
            case "number":
                const test1 = regex1.test(form.coloum3.value);
                console.log(test1);
                if (test1) {

                    db.collection('tables').add({
                        coloum1: form.coloum1.value,
                        coloum2: form.coloum2.value,
                        coloum3: form.coloum3.value
                    });

                    alert(`name : ${form.coloum1.value}\ndata type : ${form.coloum2.value}\nvalue : ${form.coloum3.value}\nare added to firestore`);
                    form.coloum1.value = '';
                    form.coloum2.value = '';
                    form.coloum3.value = '';
                }
                else {
                    alert(`data type : ${form.coloum2.value} does not match with value : ${form.coloum3.value}`);
                    form.coloum1.value = '';
                    form.coloum2.value = '';
                    form.coloum3.value = '';
                }
                break;
            case "date":
                const test2 = regex2.test(form.coloum3.value);
                console.log(test2);
                if (test2) {

                    db.collection('tables').add({
                        coloum1: form.coloum1.value,
                        coloum2: form.coloum2.value,
                        coloum3: form.coloum3.value

                    });

                    alert(`name : ${form.coloum1.value}\ndata type : ${form.coloum2.value}\nvalue : ${form.coloum3.value}\nare added to firestore`);
                    form.coloum1.value = '';
                    form.coloum2.value = '';
                    form.coloum3.value = '';
                }
                else {
                    alert(`data type : ${form.coloum2.value} does not match with value : ${form.coloum3.value}`);
                    form.coloum1.value = '';
                    form.coloum2.value = '';
                    form.coloum3.value = '';
                }

                break;
            case "multiselect":
                db.collection('tables').add({
                    coloum1: form.coloum1.value,
                    coloum2: form.coloum2.value,
                    coloum3: form.coloum3.value

                });

                alert(`name : ${form.coloum1.value}\ndata type : ${form.coloum2.value}\nvalue : ${form.coloum3.value}\nare added to firestore`);
                form.coloum1.value = '';
                form.coloum2.value = '';
                form.coloum3.value = '';
                break;
        }
    }
    else {
        alert("please enter all the fields");
    }
});