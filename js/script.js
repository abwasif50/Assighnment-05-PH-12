let coinsabilable = 100
let Counthart = 0

let copyCount = 0
let history = [];

 const coincount = document.getElementById('coinCount')


  const heartcount = document.getElementById('heartCount');
 const Copycount = document.getElementById  ('copyCount');
 const cardcontainer =   document.getElementById('cardContainer');
       const historyList = document.getElementById('historyList')



const clearhistory = document.getElementById('emptyHistoryHint')  


const clearHistoryBtn = document.getElementById('clearHistoryBtn');


const setcoins = value => { coinsabilable = value; coincount.innerText = coinsabilable; };

       const increaseheart = () => { Counthart++;heartcount.innerText = Counthart; };

const incrementCopy = () => { copyCount++;  


      Copycount.innerText = copyCount; };


const nowTimeStamp = () => new Date().
toLocaleTimeString();

const addHistoryItem = (name, number) => {
  history.push({name, number, time: nowTimeStamp()});
  renderHistory();
}

const renderHistory = () => {
  historyList.innerHTML = "";




  if(history.length === 0) clearhistory.style.display = "block";
  else {

    clearhistory.style.display = "none";






    for(let i = history.length-1; i>=0; i--){
      const li = document.createElement("li");
      li.className = "flex items-start justify-between gap-3 p-3 rounded-lg border border-slate-200";
      li.innerHTML = 
        "<div><h4 class='font-semibold'>" + history[i].name + "</h4>" +
        "<p class='text-sm text-slate-500'>" + history[i].number + "</p></div>" +
        "<span class='text-sm text-slate-400'>" + history[i].time + "</span>";


      historyList.appendChild(li);


    }
  }
}

const clearHistory = () => { history = []; renderHistory(); };

const copyToClipboard = text => {
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
  alert("Copied: " + text);
  incrementCopy();
};

const callService = (name, number) => {
  if(coinsabilable < 20){

    
    alert("Not enough coins. You need at least 20 coins to place a call.");
    return;
  }
  setcoins(coinsabilable-20);
  alert("Calling " + name + " — " + number);
  addHistoryItem(name, number);
};













cardcontainer.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if(!btn) return;

const card = btn.parentNode.parentNode; 



 const name = card.children[1].innerText; 


 const number = card.children[2].innerText; 

  if(btn.classList.contains('call-btn')) callService(name, number);


  else if(btn.classList.contains('copy-btn')) copyToClipboard(number);
  else if(btn.classList.contains('heart-btn')){


    increaseheart();
    btn.children[0].className = "fa-solid fa-heart";

  }
});

clearHistoryBtn.onclick = clearHistory;