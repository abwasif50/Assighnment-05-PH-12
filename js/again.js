// Initial Counts
let coinCount = 100;
let heartCount = 0;
let copyCount = 0;

// DOM Elements
const coinCountEl = document.getElementById('coinCount');
const heartCountEl = document.getElementById('heartCount');
const copyCountEl = document.getElementById('copyCount');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');
const cardsContainer = document.getElementById('cardsContainer');

// Event Delegation for Cards
cardsContainer.addEventListener('click', function(e){
  const card = e.target.closest('.card');
  if(!card) return; // Click outside card
  const serviceName = card.querySelector('h2').innerText;
  const hotlineNumber = card.querySelector('.hotlineNumber').innerText;

  // Heart Button
  if(e.target.closest('.heartBtn')){
    heartCount++;
    heartCountEl.innerText = heartCount;
    return;
  }

  // Copy Button
  if(e.target.closest('.copyBtn')){
    navigator.clipboard.writeText(hotlineNumber).then(()=>{
      copyCount++;
      copyCountEl.innerText = copyCount;
      alert(`Number ${hotlineNumber} copied to clipboard`);
    });
    return;
  }

  // Call Button
  if(e.target.closest('.callBtn')){
    if(coinCount < 20){
      alert("Not enough coins to make a call!");
      return;
    }
    coinCount -= 20;
    coinCountEl.innerText = coinCount;

    const now = new Date();
    const time = now.toLocaleTimeString();
    historyList.innerHTML += <li>${serviceName} - ${hotlineNumber} at ${time}</li>;
    alert(`Calling ${serviceName} (${hotlineNumber})`);
  }
});

// Clear History
clearHistoryBtn.addEventListener('click', function(){
  historyList.innerHTML = '';
});