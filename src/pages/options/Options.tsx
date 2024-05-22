import React from 'react';
import '@pages/options/Options.css';

function capitalized(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const getKey = query => query + '-storage-key';
const getStorage = async () => await chrome.storage.local.get();
const copyToClipboard = text => navigator.clipboard.writeText(text);

type StorageTypeProps = {
  query: string;
};

const StorageDump = ({ query }: StorageTypeProps) => {
  const populateTextArea = async () => {
    const key = getKey(query);
    const storage = await getStorage();
    const textArea = document.getElementById('textarea-' + key) as HTMLTextAreaElement;
    textArea.value = JSON.stringify(storage[key], null, 2);
  };
  const copyStorage = async () => {
    const key = getKey(query);
    const storage = await getStorage();
    copyToClipboard(JSON.stringify(storage[key], null, 2));
  };
  return (
    <div className="dump">
      <div className="dump__bar">
        <span className="dump__title">{capitalized(query) + ' storage'}</span>
        <button className="dump__load" onClick={populateTextArea}>
          Load
        </button>
        <button className="dump__copy" onClick={copyStorage}>
          Copy
        </button>
      </div>
      <textarea id={'textarea-' + getKey(query)} cols={50} rows={30}></textarea>
    </div>
  );
};

const Options: React.FC = () => {
  return (
    <div className="container">
      <h1>Options</h1>
      <div className="container__dumps">
        {['dork', 'theme'].map(query => (
          <StorageDump key={Date.now()} query={query} />
        ))}
      </div>
    </div>
  );
};

export default Options;
