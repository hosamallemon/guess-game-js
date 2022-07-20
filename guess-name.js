var names='';
let products = [];
function getGuess(){
    var nationality;
    var genderType;
    var ageNumber;
    const name = document.getElementById('name').value;
    const gender = fetch(`https://api.genderize.io/?name=${name}`)
    const age = fetch(`https://api.agify.io/?name=${name}`)
    const fetchPromise = fetch(`https://api.nationalize.io./?name=${name}`);
    const main = document.getElementById("card");
    const name_container = document.getElementById('all-names');
    let data = "";
    let countries="";
    let all_Img='';
    let local='';

    // main.innerHTML = "<p>Loading...";
    gender.then((response)=>{
        return response.json();
    }).then((result)=>{
        genderType=result;
    })

    age.then((response)=>{
        return response.json();
    }).then((result)=>{
        names+=`<h1>${result.name}</h1>`
        ageNumber=result;
        products.push(result.name);
        localStorage.setItem("name", names);
        document.getElementById("all-names").innerHTML = localStorage.getItem("name");
        
        console.log(localStorage)
    })
    fetchPromise
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        nationality=result;
        result.country.map((val)=>{
            countries+=val.country_id+",";
        })
        return fetch(`https://restcountries.com/v3.1/alpha?codes=${countries}`)
      }).then((country)=>{
        return country.json();
      }).then((end)=>{
                end.map((val=>{
                    all_Img+=
                    `
                    <div class="img">
                        <img src=${val.flags.svg} alt="flag">
                        <p>${val.name.common}</p>
                    </div>
                `}));

                data+=`
                <div class="card-content">
                <div class="main-img">
                ${genderType.gender == `male`?`<img src="./img/man.jpg" alt="">`
                :`<img src="./img/women3.jpg" alt="">`
                }
                
                </div>
                <div class="text">
                    <h2>${ageNumber.name}</h2>
                    <span class="name">${genderType.gender} / </span>
                    <span class="name">${ageNumber.age}</span>
                </div>
                <div class="images" id="images">
                    ${all_Img}
                </div>
                <div class="lang"></div>
            </div>`
    main.innerHTML = data;
    name_container.innerHTML = names;
    // images.innerHTML = all_Img;
    document.getElementById("all-names").innerHTML = localStorage.getItem("name");
      });
    
      
      
    }
    document.getElementById("all-names").innerHTML = localStorage.getItem("name");
  const btn = document.getElementById('guess-btn');

  btn.addEventListener('click',getGuess);
