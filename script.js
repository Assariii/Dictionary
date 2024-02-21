
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";


document.getElementById("search-btn").addEventListener("click",()=>{
  
  let word = document.getElementById("words").value;
  fetch(`${API_URL}${word}`).then((response)=> response.json()).then((data)=>{
    document.getElementById("result").innerHTML = `<div class="word">
    <h3>${word}</h3>
</div>
<div class="detail">
    <p>/${data[0].meanings[0].partOfSpeech}/</p>
</div>
<p class="meanning">
    ${data[0].meanings[0].definitions[0].definition}
</p>
<p class="example">
    ${data[0].meanings[0].definitions[0].example || ""}
</p>`;
  }).catch(()=>{
  document.getElementById("result").innerHTML = `<h3 class = "error">Can't find a word , Please try it again na kubb </h3>`;
});
});