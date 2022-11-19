import { useEffect, useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { Input, Button, useNotification, ConnectButton } from "web3uikit";
import { abi, contractAddresses } from "../constants";
export default function Game() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const ebayAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const [CAName, setCAName] = useState("");
  const [CADescription, setCADescription] = useState("");
  const [CAMin, setCAMIN] = useState("");
  const [CADuration, setCADuration] = useState("");
  const [COAuctionId, setCOAuctionId] = useState("");
  const [COValue, setCOValue] = useState("");
  const [TAuctionId, setTAuctionId] = useState("");
  const [GUAUser, setGUAUser] = useState("");
  const [GUOUser, setGUOUser] = useState("");

  const { runContractFunction: createAuction } = useWeb3Contract({
    abi: abi,
    contractAddress: ebayAddress,
    functionName: "createAuction",
    params: {
      _name: CAName,
      _description: CADescription,
      _min: CAMin,
      _duration: CADuration,
    },
  });
  const { runContractFunction: createOffer } = useWeb3Contract({
    abi: abi,
    contractAddress: ebayAddress,
    functionName: "createOffer",
    params: { _auctionId: COAuctionId },
    msgValue: COValue,
  });
  const { runContractFunction: trade } = useWeb3Contract({
    abi: abi,
    contractAddress: ebayAddress,
    functionName: "trade",
    params: { _auctionId: TAuctionId },
  });
  const { runContractFunction: getAuction } = useWeb3Contract({
    abi: abi,
    contractAddress: ebayAddress,
    functionName: "getAuction",
    params: {},
  });
  const { runContractFunction: getUserAuctions } = useWeb3Contract({
    abi: abi,
    contractAddress: ebayAddress,
    functionName: "getUserAuctions",
    params: { _user: GUAUser },
  });
  const { runContractFunction: getUserOffers } = useWeb3Contract({
    abi: abi,
    contractAddress: ebayAddress,
    functionName: "getUserOffers",
    params: { _user: GUOUser },
  });

  // async function latestTweets() {
  //   const id = await getLatestTweets();
  //   console.log(id);
  //   document.getElementById("latestTweets").innerHTML = id;
  // }

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
    document.getElementById("createAuction").innerHTML = "";
    document.getElementById("createOffer").innerHTML = "";
    document.getElementById("trade").innerHTML = "";
    document.getElementById("getAuction").innerHTML = "";
    document.getElementById("getUserAuctions").innerHTML = "";
    document.getElementById("getUserOffers").innerHTML = "";
  };

  return (
    <div>
      <div>
        <p className=" flex justify-center pb-3 font-bold">
          {isWeb3Enabled ? (
            <a
              className="box-content bg-blue-300 shadow-xl  ring-2 border-blue-300  ..."
              href="https://goerli.etherscan.io/address/0x0a552F2823e460ea471447Ad2E6479d1743e4AD7#code"
            >
              More on Etherscan
            </a>
          ) : (
            "Please connect to a supported chain (goerli) to interact!"
          )}
        </p>
        <div className="flex justify-center space-x-20 ">
          <div>
            <div className="pb-2">
              <Input
                label="Enter name of your auction"
                labelBgColor="rgb(20 83 45 / 0)"
                name="createAuction"
                onBlur={function noRefCheck() {}}
                value={CAName}
                onChange={({ target }) => setCAName(target?.value)}
                type="text"
              />
            </div>
            <div>
              <Input
                label="Enter description about your auction"
                labelBgColor="rgb(20 83 45 / 0)"
                name="createAuction"
                onBlur={function noRefCheck() {}}
                value={CADescription}
                onChange={({ target }) => setCADescription(target?.value)}
                type="text"
              />
            </div>
          </div>
          <div>
            <div className="pb-2">
              <Input
                label="What is the minimum amount to offer?"
                labelBgColor="rgb(37 99 235 / 0)"
                name="createAuction"
                onBlur={function noRefCheck() {}}
                value={CAMin}
                onChange={({ target }) => setCAMIN(target?.value)}
                type="text"
              />
            </div>
            <div>
              <Input
                label="how long the auction will be available"
                labelBgColor="rgb(37 99 235 / 0)"
                name="createAuction"
                onBlur={function noRefCheck() {}}
                value={CADuration}
                onChange={({ target }) => setCADuration(target?.value)}
                type="text"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-center py-3">
            <Button
              color="blue"
              onClick={async () => {
                await createAuction({
                  onSuccess: handleSuccess,
                  onError: (error) => handleError(error, "createAuction"),
                });
              }}
              text="Create Auction"
              theme="colored"
            />
          </div>
        </div>
        <span id="createAuction" className="text-red-600 "></span>
        <div className=" flex justify-center space-x-12">
          <div>
            <div className="py-2 ">
              <Input
                label="Enter the auction id to offer"
                labelBgColor="rgb(20 83 45 / 0)"
                name="createOffer"
                onBlur={function noRefCheck() {}}
                value={COAuctionId}
                onChange={({ target }) => setCOAuctionId(target?.value)}
                type="text"
              />
            </div>
            <div>
              <Input
                label="Enter amount to offer"
                labelBgColor="rgb(20 83 45 / 0)"
                name="createOffer"
                onBlur={function noRefCheck() {}}
                value={COValue}
                onChange={({ target }) => setCOValue(target?.value)}
                type="text"
              />
            </div>

            <div className=" flex justify-center pt-3">
              <Button
                color="blue"
                onClick={async () => {
                  await createOffer({
                    onSuccess: handleSuccess,
                    onError: (error) => handleError(error, "createOffer"),
                  });
                }}
                text="Create Offer"
                theme="colored"
              />
            </div>
            <span id="createOffer" className="text-red-600 w-10"></span>
          </div>
          <div>
            <div className="pt-5">
              <Input
                label="Enter the auction id to trade"
                labelBgColor="rgb(37 99 235 / 0)"
                name="trade"
                onBlur={function noRefCheck() {}}
                value={TAuctionId}
                onChange={({ target }) => setTAuctionId(target?.value)}
                type="text"
              />
            </div>

            <div className=" flex justify-center pt-3">
              <Button
                color="blue"
                onClick={async () => {
                  await trade({
                    onSuccess: handleSuccess,
                    onError: (error) => handleError(error, "trade"),
                  });
                }}
                text="Trade"
                theme="colored"
              />
            </div>
            <span id="trade" className="text-red-600"></span>
          </div>
        </div>

        <div>
          <div className=" flex justify-center pb-2">
            <Button
              color="green"
              onClick={async () => {
                await getAuction({
                  onSuccess: handleSuccess,
                  onError: (error) => handleError(error, "getAuction"),
                });
              }}
              text="Get Auction List"
              theme="colored"
            />
          </div>
          <div class=" box-content h-20 w-100 p-4 border-4 ...">
            <span id="getAuction" className="text-red-600"></span>
            <span id="latestTweets" className="text-black-600"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
