import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncSelect from 'react-select/async';

const MyAsyncSelect = ({ onSelectChange  }) => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/write/stock');
        setStock(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    }
    fetchData();
  }, []);

  const filterOptions = (inputValue) => {
    return stock.filter((stockItem) =>
      stockItem.stockName.toLowerCase().includes(inputValue.toLowerCase())
    ).map((stockItem) => ({
      value: stockItem.stockName,
      label: stockItem.stockName
    }));
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      const filteredOptions = filterOptions(inputValue);
      callback(filteredOptions);
    }, 1000);
  };

  const handleSelectChange = (selectedOption) => {
    onSelectChange(selectedOption.value); // 선택한 주식 코드를 상위 컴포넌트로 전달
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      placeholder="주식 종목 검색"
      onChange={handleSelectChange}
    />
  );
};

export default MyAsyncSelect;
