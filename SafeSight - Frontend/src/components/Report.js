import React, { use, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import styles from "../styles/home.module.css";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import FileDownload from "./FileDownload";
const configuration = new Configuration({
  //   organization: "org-0nmrFWw6wSm6xIJXSbx4FpTw",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

function Report({ data, fillReport, clearModal }) {
  const chat = async (e, message) => {
    e.preventDefault();
    console.log("goin)");
    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({
      role: "user",
      content:
        message +
        "|| when you are finished, remeber, return only DONE | [HTML STRING]",
    });
    console.log(chats);
    setChats(msgs);

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Act as a paralegal. I am going to send you a html string called “personalInjuryForm”. I will also send you a string called “injuryContext”. Ask me questions one question at a time to fill out the form. Use the injury context to fill in what you can on the form, but make sure you ask me to confirm your predictions. After all the questions are finished. When you are done, return DONE | [HTML STRING]",
          },
          ...chats,
        ],
      })
      .then((res) => {
        if (
          res.data.choices[0].message.content.toLowerCase().includes("done")
        ) {
          console.log(res.data.choices[0].message.content.toLowerCase());
          msgs.push({
            role: "paralegal",
            content: "Perfect, I will generate the form now!",
          });
          setFormHTML(res.data.choices[0].message.content.split("|")[1]);
          setFormGenerated(true);
          fillReport(
            data.index,
            res.data.choices[0].message.content.split("|")[1]
          );
        } else {
          msgs.push(res.data.choices[0].message);
          setChats(msgs);
          setMessage("");
        }
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [formGenerated, setFormGenerated] = useState(false);
  const [formHTML, setFormHTML] = useState("");
  const [startData, setStartData] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    console.log(data);
    console.log(clearModal);
    if (chats.length == 0) {
      let msgs = chats;
      msgs.push({
        role: "user",
        content: "Context" + data.gpt + "\nPersonal Injury Form: " + piform,
      });
      setIsTyping(true);
      openai
        .createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Act as a paralegal. I am going to send you a html string called “personalInjuryForm”. I will also send you a string called “injuryContext”. Ask me questions one question at a time to fill out the form. Use the injury context to fill in what you can on the form, but make sure you ask me to confirm your predictions. After all the questions are finished. When you are done, return DONE | [HTML STRING]",
            },
            ...chats,
          ],
        })
        .then((res) => {
          console.log("hi");
          msgs.push(res.data.choices[0].message);
          setChats(msgs);
          setIsTyping(false);
        })
        .catch((error) => {
          console.log(error);
        });

      setChats(msgs);
    }
  }, []);

  return (
    <div className={styles.chatModal}>
      <div className={styles.chatBox}>
        <div>
          <p>
            <i>{isTyping ? "Typing" : <p />}</i>
          </p>
        </div>
        {chats && chats.length
          ? chats
              .slice(1)
              .toReversed()
              .map((chat, index) => (
                <div>
                  <p
                    key={index}
                    className={chat.role === "user" ? "user_msg" : ""}
                  >
                    <span>
                      <b>
                        {chat.role.toUpperCase() == "USER"
                          ? "USER"
                          : "PARALEGAL"}
                      </b>
                    </span>
                    <span>:</span>
                    <span>{chat.content.split("||")[0]}</span>
                  </p>
                  {/* <div className={isTyping ? "" : "hide"}></div> */}
                </div>
              ))
          : ""}
        <div>
          {" "}
          <span>
            <b>PARALEGAL </b>
          </span>
          I'm ready to help you write your worker compensation form. From the
          video, I discovered the following: {"\n \n" + data.gpt}
          <p /> I have a couple more questions to ask you to fill out the form.
        </div>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
      {formGenerated ? <FileDownload html={formHTML} /> : <p />}
    </div>
  );
}

export default Report;

const piform = `<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Personal Injury Form</title>
</head>
<body>

<form action="#" method="post">
<label for="location">Where did your injury occur?</label><br>
City: <input type="text" name="city" id="location"><br>
State: <input type="text" name="state"><br>
County: <input type="text" name="county"><br><br>

<label>How did your injury occur?</label><br>
<input type="radio" name="cause" value="Aircraft accident"> Aircraft accident<br>
<input type="radio" name="cause" value="Animal bite or attack"> Animal bite or attack<br>
<input type="radio" name="cause" value="Assault and battery"> Assault and battery<br>
<input type="radio" name="cause" value="Defective premises"> Defective premises<br>
<input type="radio" name="cause" value="Defective product"> Defective product<br>
<input type="radio" name="cause" value="Police negligence"> Police negligence<br>
<input type="radio" name="cause" value="Medical malpractice"> Medical malpractice<br>
<input type="radio" name="cause" value="Motor vehicle accident"> Motor vehicle accident<br>
<input type="radio" name="cause" value="Slip or trip and fall"> Slip or trip and fall<br>
<input type="radio" name="cause" value="Water-related accident"> Water-related accident<br>
<input type="radio" name="cause" value="Other"> Other: <input type="text" name="otherCause"><br><br>

<label for="description">Describe how your injury occurred.</label><br>
<textarea name="description" id="description" rows="4" cols="50"></textarea><br><br>

<label for="responsible">Who do you believe caused or is responsible for your injury, and why?</label><br>
<textarea name="responsible" id="responsible" rows="4" cols="50"></textarea><br><br>

<label for="injuryDescription">Describe your injury(ies).</label><br>
<textarea name="injuryDescription" id="injuryDescription" rows="4" cols="50"></textarea><br><br>

<input type="submit" value="Submit">
</form>

</body>
</html>


`;
