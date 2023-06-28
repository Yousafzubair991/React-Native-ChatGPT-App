import React, { useCallback, useEffect, useState } from "react";

import { API_URL } from "./src/constants/Urls";
import { GiftedChat } from "react-native-gifted-chat";
import { Images } from "./src/constants/Images";
import { SafeAreaView } from "react-native";

const YOUR_API_KEY = ""; //ENTER YOUR API KEY HERE
const MAX_TOKENS = 100;

export default function Example() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    firstMessage();
  }, []);

  const firstMessage = () => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chatbot GPT",
          avatar: Images?.logo,
        },
      },
    ]);
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const value = messages[0].text;
    callApi(value);
  }, []);

  const callApi = async (value) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${YOUR_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: value,
        max_tokens: MAX_TOKENS,
        temperature: 0,
      }),
    });

    const data = await res.json();

    if (data) {
      const value = data?.choices[0]?.text;
      addNewMessage(value);
      console.log("Data: ", value);
    }
  };

  const addNewMessage = (data) => {
    const value = {
      _id: Math.random(999999999999),
      text: data,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Chatbot GPT",
        avatar: logo,
      },
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, value)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
}
