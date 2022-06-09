import { useEffect, useState } from "react";
import ChainContainer from "./components/Chain";
import InputContainer from "./components/Input";
import TokenContainer from "./components/Token";
import { useSdk } from "./hooks/usdSdk";
import useAuth from "./hooks/useAuth";

const Home = () => {
  const { account, chainId, connect } = useAuth();
  const { chains, tokens } = useSdk();
  const [fromChain, setFromChain] = useState({ chainId: 1 });
  const [toChain, setToChain] = useState({ chainId: 1 });
  const [fromTokens, setFromTokens] = useState([]);
  const [toTokens, setToTokens] = useState([]);
  const [fromToken, setFromToken] = useState();
  const [toToken, setToToken] = useState();

  useEffect(() => {
    const fromTokenList = [...tokens].filter((t) => Number(t.chainId) === Number(fromChain.chainId));
    setFromTokens(fromTokenList);
  }, [fromChain]);

  useEffect(() => {
    const toTokenList = [...tokens].filter((t) => Number(t.chainId) === Number(toChain.chainId));
    setToTokens(toTokenList);
  }, [toChain]);

  console.log('FromToken:', fromToken);
  const onChangeFromChain = (e) => {
    const chain = chains.find((c) => Number(c.chainId) === Number(e.target.value));
    setFromChain(chain);
  };
  const onChangeToChain = (e) => {
    const chain = chains.find((c) => Number(c.chainId) === Number(e.target.value));
    setToChain(chain);
  };
  const onChangeFromToken = (e) => {
    const token = fromTokens.find((t) => t.address === e.target.value);
    setFromToken(token);
  };
  const onChangeToToken = (e) => {
    const token = fromTokens.find((t) => t.address === e.target.value);
    setToToken(token);
  };

  const getButtonName = () => {
    if (!account) return 'Connect Wallet';
    if (Number(fromChain.chainId) !== Number(chainId)) return `Switch to ${fromChain?.name || 'Ethereum'}`;
    return 'Send';
  };
  const onClick = () => {
    if (!account) return connect();
  };

  return (
    <div className="w-128 mx-auto mt-40">
      <h1 className="text-2xl font-bold text-white">
        CROSS-CHAIN TRANSFER (DEMO SDK)
      </h1>
      <div className="mt-4 p-8 rounded-xl border border-slate-300 bg-white">
        <div className="flex flex-row gap-4">
          <div className="w-1/2 flex flex-col gap-4">
            <p>From</p>
            <ChainContainer data={chains} onChange={onChangeFromChain} />
            <TokenContainer data={fromTokens} onChange={onChangeFromToken} />
            {fromToken && <span className="text-center text-sm">0.00 {fromToken.symbol}</span>}
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <p>To</p>
            <ChainContainer data={chains} onChange={onChangeToChain} />
            <TokenContainer data={toTokens} onChange={onChangeToToken} />
          </div>
        </div>

        <div className="mt-4 flex flex-row gap-4">
          <div className="w-1/2 flex flex-col gap-4 justify-center">
            <p>Amount <span className="p-2 font-bold bg-stone-400 rounded-xl text-white cursor-pointer">Max</span></p>
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <InputContainer />
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <button
            className="w-full bg-blue-400 px-6 py-4 rounded text-white hover:bg-blue-500 active:bg-blue-600"
            onClick={onClick}
          >
            {getButtonName()}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
