console.log('This is cV Scanner project');


// Ganaral tactic
/*
function CvIterator(array) {
    let starting = 0;
    return{
        next:function() {
            if (starting<array.length) {
                return{
                    value:array[starting++],
                    done:false
                }
            } else {
                return{
                    done:true
                }
            }
        }
    }
}
*/

// new  tactic
const CvIterator = (array) => {
    let starting = 0;
    return {
        next: () => {
            return starting < array.length ?
                {
                    value: array[starting++],
                    done: false
                } :
                { done: true }
        }
    };
};




let obj;
let candidates;

// using the XMLHttpRequest method 
/*
async function file(path, method) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, path, true)

    xhr.onload = function () {
        if (this.status == 200) {
            obj = JSON.parse(this.responseText)
            candidates = CvIterator(obj)
        }
    }
    xhr.send()
}
*/

// using the fetch method
function file(path) {
    fetch(path).then(responce => responce.json())
        .then(data => {
            if (data.error) {
                candidates = data.error
            }
            obj = data
            // console.log(data)
            candidates = CvIterator(obj)
        })



}

// calling the xhr file function
file('profile.json')


// init the btn next element 
let next = document.getElementById('btn')
next.addEventListener('click', nextCv)

// next Cv function 
async function nextCv() {
    try { 
        let currenteCandidate = candidates.next().value
        let img = document.getElementById('img')
        let profile = document.getElementById('profile')
        img.innerHTML = `<img src='${currenteCandidate.image}'>`
        profile.innerHTML = `<ul class="list-group list-group-flush">
                                <li class="list-group-item">Name :  ${currenteCandidate.name}</li>
                                <li class="list-group-item">Name :  ${currenteCandidate.age}</li>
                                <li class="list-group-item">Name :  ${currenteCandidate.languege}</li>
                                <li class="list-group-item">Name :  ${currenteCandidate.degree}</li>
                        </ul>`
    } catch (error) {
        document.getElementById('profile').innerHTML = error
    }

};
nextCv();