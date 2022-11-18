import { useEffect, useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { Input, Button, useNotification, ConnectButton } from "web3uikit";
import { abi, contractAddresses } from "../constants";
export default function Game() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const twitterAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const [tweetContent, setTweetContent] = useState("");
  const [tweetFromFrom, setTweetFromFrom] = useState("");
  const [tweetFromContent, setTweetFromContent] = useState("");
  const [sendMessageContent, setSendMessageContent] = useState("");
  const [sendMessageTo, setSendMessageTo] = useState("");
  const [sendMessageFromContent, setSendMessageFromContent] = useState("");
  const [sendMessageFromFrom, setSendMessageFromFrom] = useState("");
  const [sendMessageFromTo, setSendMessageFromTo] = useState("");
  const [followFollowed, setFollowFollowed] = useState("");
  const [getCount, setGetCount] = useState("");
  const [getTweetOfUser, setGetTweetOfUser] = useState("");
  const [getTweetOfCount, setGetTweetOfCount] = useState("");
  const [getLatestTweetsCount, setGetLatestTweetsCount] = useState("");

  const { runContractFunction: tweet } = useWeb3Contract({
    abi: abi,
    contractAddress: twitterAddress,
    functionName: "tweet",
    params: { _content: tweetContent },
  });
  const { runContractFunction: tweetFrom } = useWeb3Contract({
    abi: abi,
    contractAddress: twitterAddress,
    functionName: "tweetFrom",
    params: { _from: tweetFromFrom, _content: tweetFromContent },
  });
  const { runContractFunction: sendMessage } = useWeb3Contract({
    abi: abi,
    contractAddress: twitterAddress,
    functionName: "sendMessage",
    params: { _content: sendMessageContent, _to: sendMessageTo },
  });
  const { runContractFunction: sendMessageFrom } = useWeb3Contract({
    abi: abi,
    contractAddress: twitterAddress,
    functionName: "sendMessageFrom",
    params: {
      _content: sendMessageFromContent,
      _from: sendMessageFromFrom,
      _to: sendMessageFromTo,
    },
  });
  const { runContractFunction: follow } = useWeb3Contract({
    abi: abi,
    contractAddress: twitterAddress,
    functionName: "follow",
    params: { _followed: followFollowed },
  });
  const { runContractFunction: getTweetOf } = useWeb3Contract({
    abi: abi,
    contractAddress: twitterAddress,
    functionName: "getTweetOf",
    params: { _user: getTweetOfUser, count: getTweetOfCount },
  });
  const { runContractFunction: getLatestTweets } = useWeb3Contract({
    abi: abi,
    contractAddress: twitterAddress,
    functionName: "getLatestTweets",
    params: { count: getLatestTweetsCount },
  });

  async function latestTweets() {
    const id = await getLatestTweets();
    console.log(id);
    document.getElementById("latestTweets").innerHTML = id;
  }

  const dispatch = useNotification();

  const handleError = async (error, id) => {
    const e = error;
    document.getElementById(id).innerHTML =
      error == "[object Object]" ? " : error! please check console" : error;
    console.log(id);
  };
  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      handleNewNotification(tx);
      console.log("successfull");
      // updateUI();
    } catch (error) {
      console.log(error);
    }
  };
  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "transaction complete!",
      title: "transaction notification",
      position: "topR",
      icon: "bell",
    });
    document.getElementById("tweet").innerHTML = "";
    document.getElementById("tweetFrom").innerHTML = "";
    document.getElementById("follow").innerHTML = "";
    document.getElementById("getLatestTweets").innerHTML = "";
    document.getElementById("follow").innerHTML = "";
    document.getElementById("sendMessage").innerHTML = "";
    document.getElementById("sendMessageFrom").innerHTML = "";
    document.getElementById("latestTweets").innerHTML = "";
  };

  return (
    <div className="flex">
      <div className="box-border w-1/2 h-screen bg-blue-300 pr-4">
        <p className=" flex justify-center pb-3 font-bold">
          {isWeb3Enabled ? (
            <a
              className="box-content bg-blue-500 shadow-xl shadow-amber-100 ring-2 border-blue-600  ..."
              href="https://goerli.etherscan.io/address/0xf4f3E9F19Aa568848e145855416c205D4bA3Bfe0#code"
            >
              More on Etherscan
            </a>
          ) : (
            "Please connect to a supported chain (goerli) to interact!"
          )}
        </p>
        <div className="pt-5 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-xl shadow-violet-300">
          <div className="flex justify-center">
            <Input
              label="Enter your tweet content"
              labelBgColor=""
              name="tweet"
              onBlur={function noRefCheck() {}}
              value={tweetContent}
              onChange={({ target }) => setTweetContent(target?.value)}
              type="text"
            />
          </div>
          <div className=" flex justify-center pt-1 pb-2">
            <Button
              color="blue"
              onClick={async () => {
                await tweet({
                  onSuccess: handleSuccess,
                  onError: (error) => handleError(error, "tweet"),
                });
              }}
              text="Tweet"
              theme="colored"
            />
            <span id="tweet" className="text-red-600"></span>
          </div>
          <div>
            <div className="p-1">
              <Input
                label="Enter on behalf address"
                labelBgColor=""
                name="tweet from"
                onBlur={function noRefCheck() {}}
                value={tweetFromFrom}
                onChange={({ target }) => setTweetFromFrom(target?.value)}
                type="text"
              />
            </div>
            <div className="py-1">
              <Input
                label="Enter content of your tweet"
                labelBgColor=""
                name="tweet from"
                onBlur={function noRefCheck() {}}
                value={tweetFromContent}
                onChange={({ target }) => setTweetFromContent(target?.value)}
                type="text"
              />
            </div>
            <div className=" flex justify-center">
              <Button
                color="blue"
                onClick={async () => {
                  await tweetFrom({
                    onSuccess: handleSuccess,
                    onError: (error) => handleError(error, "tweetFrom"),
                  });
                }}
                text="Tweet From"
                theme="colored"
              />
              <span id="tweetFrom" className="text-red-600"></span>
            </div>
          </div>

          <div className="pt-2">
            <div className="py-1">
              <Input
                label="Enter address of the user to get tweet"
                name="getTweetOf"
                onBlur={function noRefCheck() {}}
                value={getTweetOfUser}
                onChange={({ target }) => setGetTweetOfUser(target?.value)}
                type="text"
              />
            </div>
            <div className="pt-1 pb-1">
              <Input
                label="Enter number of tweets you want"
                name="get tweet of"
                onBlur={function noRefCheck() {}}
                value={getTweetOfCount}
                onChange={({ target }) => setGetTweetOfCount(target?.value)}
                type="text"
              />
            </div>
            <div className="flex justify-center">
              <Button
                color="green"
                onClick={async () => {
                  await getTweetOf({
                    onSuccess: handleSuccess,
                    onError: (error) => handleError(error, "getTweetOf"),
                  });
                }}
                text="Get Tweet of a user"
                theme="colored"
              />
            </div>
            <span id="getTweetOf" className="text-red-600"></span>
          </div>
          <div className="pt-3">
            <Input
              label="Enter number of tweets you want"
              name="getLatestTweet"
              onBlur={function noRefCheck() {}}
              value={getLatestTweetsCount}
              onChange={({ target }) => setGetLatestTweetsCount(target?.value)}
              type="number"
            />
            <div className="flex justify-center pb-1 pt-3">
              <Button
                color="green"
                onClick={async () => {
                  await latestTweets({
                    // onSuccess: handleSuccess,
                    onError: (error) => handleError(error, "getLatestTweets"),
                  });
                }}
                text="Get latest tweets"
                theme="colored"
              />
            </div>
            <span id="getLatestTweets" className="text-red-600"></span>
            <span id="latestTweets" className="text-black-600"></span>
          </div>
        </div>
      </div>
      <div className="box-border w-1/2 h-screen pl-4 bg-sky-500/100 ...">
        <span className="flex justify-center pb-5 pt-2">
          <ConnectButton moralisAuth={false} />
        </span>
        <div className="py-3 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-xl shadow-violet-600">
          <div>
            <div className="py-3">
              <Input
                label="Enter address to follow"
                name="follow"
                onBlur={function noRefCheck() {}}
                value={followFollowed}
                onChange={({ target }) => setFollowFollowed(target?.value)}
                type="text"
              />
            </div>
            <div>
              <div className="flex justify-center">
                <Button
                  color="green"
                  onClick={async () => {
                    await follow({
                      onSuccess: handleSuccess,
                      onError: (error) => handleError(error, "follow"),
                    });
                  }}
                  text="Follow"
                  theme="colored"
                />
              </div>
            </div>
            <span id="follow" className="text-red-600"></span>
          </div>
          <div className="py-3">
            <div>
              <Input
                label="Enter content to send "
                name="send message"
                onBlur={function noRefCheck() {}}
                value={sendMessageContent}
                onChange={({ target }) => setSendMessageContent(target?.value)}
                type="text"
              />
            </div>
            <div className="py-1">
              <Input
                label="Enter receiver address"
                name="send message"
                onBlur={function noRefCheck() {}}
                value={sendMessageTo}
                onChange={({ target }) => setSendMessageTo(target?.value)}
                type="text"
              />
            </div>

            <div className="flex justify-center">
              <Button
                color="green"
                onClick={async () => {
                  await sendMessage({
                    onSuccess: handleSuccess,
                    onError: (error) => handleError(error, "sendMessage"),
                  });
                }}
                text="Send Message"
                theme="colored"
              />
            </div>
            <span id="sendMessage" className="text-red-600"></span>
          </div>
          <div>
            <div className="py-1">
              <Input
                label="Enter your content to send"
                name="send message from"
                onBlur={function noRefCheck() {}}
                value={sendMessageFromContent}
                onChange={({ target }) =>
                  setSendMessageFromContent(target?.value)
                }
                type="text"
              />
            </div>
            <div>
              <Input
                label="Enter address of behalf"
                name="send message from"
                onBlur={function noRefCheck() {}}
                value={sendMessageFromFrom}
                onChange={({ target }) => setSendMessageFromFrom(target?.value)}
                type="text"
              />
            </div>
            <div className="py-1">
              <Input
                label="Enter message receiver address"
                name="send message from"
                onBlur={function noRefCheck() {}}
                value={sendMessageFromTo}
                onChange={({ target }) => setSendMessageFromTo(target?.value)}
                type="text"
              />
            </div>

            <div className="flex justify-center">
              <Button
                color="green"
                onClick={async () => {
                  await sendMessageFrom({
                    onSuccess: handleSuccess,
                    onError: (error) => handleError(error, "sendMessageFrom"),
                  });
                }}
                text="Send Message From"
                theme="colored"
              />
            </div>
            <span id="sendMessageFrom" className="text-red-600"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
