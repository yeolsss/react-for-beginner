import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selected, setSelected] = useState('');
  const [useMoney, setUseMoney] = useState(0);
  const [buyCoin, setBuyCoin] = useState(0);
  const reset = () => {
    setUseMoney(0);
    setSelected('');
    handleBuyCoin(useMoney, selected);
  };
  const handleSelect = (event) => {
    setSelected(event.target.value);
    handleBuyCoin(useMoney, event.target.value);
  };

  const handleDeposit = (event) => {
    setUseMoney(parseInt(event.target.value));
    handleBuyCoin(parseInt(event.target.value), selected);
  };
  const handleBuyCoin = (eventMoney, eventCoin) => {
    setBuyCoin(
      !isNaN(eventMoney / parseFloat(eventCoin))
        ? eventMoney / parseFloat(eventCoin)
        : 0
    );
  };
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The coins!({coins.length})</h1>
      {loading ? <strong>Loading...</strong> : null}
      <label htmlFor='useMoney'>사용금액: </label>
      <input
        type='number'
        id='useMoney'
        value={useMoney}
        onChange={handleDeposit}
      />
      <select onChange={handleSelect} value={selected}>
        <option value='xx'>select Coin</option>
        {coins.map((coin) => (
          <option value={coin.quotes.USD.price}>
            {coin.name} ({coin.symbol}):${coin.quotes.USD.price}
          </option>
        ))}
      </select>
      <h1>{buyCoin}개의 Coin을 구매하실수 있습니다.</h1>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
