import { useState } from "react";
import ChainContainer from "./components/Chain";
import InputContainer from "./components/Input";
import TokenContainer from "./components/Token";
import useAuth from "./hooks/useAuth";
// import SwingSDK from '@swing.xyz';

const Home = () => {
  const { account, chainId, connect, disconnect } = useAuth();
  const [chain, setChain] = useState(1);

  const getButtonName = () => {
    if (!account) return 'Connect Wallet';
    if (chain !== chainId) return 'Switch to ...';
    return 'Send';
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
            <ChainContainer />
            <TokenContainer />
            <span className="text-center text-sm">0.00 USDT</span>
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <p>To</p>
            <ChainContainer />
            <TokenContainer />
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
            onClick={!!account ? disconnect : connect}
          >
            {getButtonName()}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
