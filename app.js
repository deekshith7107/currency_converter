
const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const add_selects=document.querySelectorAll(".change select");

const btn=document.querySelector("form button");

const from=document.querySelector(".from select");
const to=document.querySelector(".to select");
const msg=document.querySelector(".inf");


// for(option in countryList ){
//     console.log(option,countryList[option]);
// }
for(let select of add_selects){
    for(code in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=code;
        newoption.value=code;
        if(select.name==="from" && code==="INR"){
            newoption.selected="selected";
        }else if(select.name==="to" && code==="USD"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflags(evt.target);
    });
}
const updateflags=(element)=>{
    let flag=element.value;
    let con=countryList[flag];
    let newsrc=`https://flagsapi.com/${con}/flat/64.png`;
    const image=element.parentElement.querySelector("img");
    image.src=newsrc;
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    const amt=document.querySelector(".amount input");
    let amtval=amt.value;
    if(amtval==='' || amtval<=0){
        amtval=1;
        amt.value='1';
    }
    const url=`${base_url}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data[to.value.toLowerCase()];
    let final=amtval*rate;
    
    msg.innerText=`${amtval} ${from.value} = ${final} ${to.value}`;
})



