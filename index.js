import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async(req, res) => {
  try {
    const search = req.body.word;
    const response = await axios.get(`${API_URL}${search}`);

    console.log(response.data);
    const meaning = response.data[0]; // Assuming the API response is an array with the first item containing the information
    let mean = JSON.stringify(meaning.meanings[0].definitions[0].definition);
    let means;
    let partOf = JSON.stringify(meaning.meanings[0].partOfSpeech);
    let part;
    let sy = JSON.stringify(meaning.meanings[0].synonyms);
    let sym;
    for(let i=0;i<sy.length;i++){
      if(sy[i]!='[' && sy[i]!=']' && sy[i]!='"'){
        sym+=sy[i];
      }
    }
    for(let i=0;i<partOf.length;i++){
      if(partOf[i]!='"'){
        part+=partOf[i];
      }
    }
    for(let i=0;i<mean.length;i++){
      if(mean[i]!='"' && mean[i]!=';' ){
        means+=mean[i];
      }
    }
    let tmp = means.slice(9,means.length);
    let tmp2 = part.slice(9,part.length);
    let tmp3 = sym.slice(9,sym.length);
    res.render("index.ejs", {
      word: search,
      mean: tmp, // Assuming there's only one definition
      type: tmp2,// Assuming there's only one meaning
      sym: tmp3
    });
  } 
  catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
