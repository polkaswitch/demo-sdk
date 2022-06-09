import SwingSDK from "@swing.xyz/sdk";
import { useEffect, useState } from "react";

const sdk = new SwingSDK();
export const useSdk = () => {
  const [tokens, setTokens] = useState([]);
  const [chains, setChains] = useState([]);

  useEffect(() => {
    sdk.init().then(() => {
      setTokens(sdk.tokens);
      setChains(sdk.chains);
    });
  }, []);

  const connect = () => sdk.wallet.connect();
  const getQuote = (params) => sdk.getQuote(params);
  const transfer = (transferRoute, params) => sdk.transfer(transferRoute, params);

  return { connect, getQuote, transfer, tokens, chains };
}
