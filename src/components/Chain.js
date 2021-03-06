const ChainContainer = ({ data = [], onChange = () => {} }) => {
  const renderChains = () => data.map((chain, idx) => <option key={idx} value={chain.chainId}>{chain.name}</option>);

  return (
    <select className="border rounded-xl p-2" onChange={onChange}>
      {renderChains()}
    </select>
  );
};

export default ChainContainer;