/* eslint-disable no-console */
import React, { useState } from 'react';
import Textarea from 'rc-textarea';

export default function App() {
  const [value, setValue] = useState('hello\nworld');

  const onChange = (e) => {
    const {
      target: { value: currentValue },
    } = e;
    setValue(currentValue);
  };

  const onOverMax = ({ currentLength, value }) => {
    console.log(
      `input is over maxLength, current length: ${currentLength}, value: ${value}`,
    );
  };

  return (
    <div>
      <p>when set `maxlength`</p>
      <Textarea
        autoSize={{ minRows: 5, maxRows: 15 }}
        value={value}
        onChange={onChange}
        maxLength={30}
        allowInputOverMax
      />
      <p>when set `allowInputOverMax` to allow input</p>
      <Textarea
        autoSize={{ minRows: 5, maxRows: 15 }}
        value={value}
        onChange={onChange}
        maxLength={30}
        allowInputOverMax
      />
      <p>when set `allowInputOverMax` to false</p>
      <Textarea
        autoSize={{ minRows: 5, maxRows: 15 }}
        value={value}
        onChange={onChange}
        maxLength={30}
      />
    </div>
  );
}
