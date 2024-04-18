import { useState } from 'react';
import dorkStorage from '@src/shared/storages/dorkStorage.ts';

type DorkProps = {
  content: string;
  id: number;
};

function Dork({ content, id }: DorkProps) {
  const [editMode, setEditMode] = useState(content ? false : true);
  const toggleEditMode = () => setEditMode(!editMode);
  const changeDork = dorkStorage.changeDork;
  const removeDork = dorkStorage.removeDork;
  const injectDork = dorkStorage.injectDork;

  return (
    <div className="dork">
      {editMode ? (
        <div className="dork__inner dork__inner--edit-mode">
          <input
            className="input"
            defaultValue={content}
            onChange={async e => await changeDork(id, e.target.value)}
            style={{ width: content.length + 'ch', height: '0.85em' }}
          />
          <button className="button dork__accept" onClick={toggleEditMode}>
            V
          </button>
          <button className="button dork__remove" onClick={async () => await removeDork(id)}>
            X
          </button>
        </div>
      ) : (
        <div className="dork__inner">
          <button className="button dork__inject" onClick={() => injectDork(content)}>
            {content}
          </button>
          <button className="button dork__edit" onClick={toggleEditMode}>
            E
          </button>
          <button className="button dork__remove" onClick={async () => await removeDork(id)}>
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default Dork;
