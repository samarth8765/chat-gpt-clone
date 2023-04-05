import { config } from "dotenv";config();
import { Configuration , OpenAIApi } from "openai";
const apiKey = process.env.API_KEY_samarthdhawan007;
import express from "express";
const app = express();
import './db/connection.js';
import {chat_data} from './db/chat_schema.js';

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.set("views", "views");
app.set("view engine", "ejs");

const getDataChatgpt = async (query)=>{
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: query }],
  });

  return response;
}


app.get("/", (req, res) => {
  res.render("index",{chat_input:"Bhaiya pehle kuch dipawa me likho toh!!"});
});

app.get("/getData", async (req,res)=>{
    const getData = await chat_data.find();
    res.render('show_all_data', {getData});
  });


app.post("/", async (req, res) => { 
    const query = req.body.query;
    const response = await getDataChatgpt(query);
    const reply = response.data.choices[0].message.content;
    console.log(reply);

    const data = new chat_data({query, reply});
    const save = await data.save();

    res.render('index', {chat_input:reply});
});



app.listen(8000);
