import { useState, useEffect, useRef, InputHTMLAttributes, Dispatch } from 'react';
import dorkStorage from '@src/shared/storages/dorkStorage.ts';
import { Immutable } from 'immer';

interface DorkInputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly content: string;
  setEditMode: Dispatch<React.SetStateAction<boolean>>;
}

type DorkProps = Immutable<{
  content: string;
  id: number;
}>;

function DorkInput({ className, content, onChange, setEditMode }: DorkInputProps) {
  const ref = useRef(null);
  useEffect(() => {
    const handlePressEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        setEditMode(false);
      }
    };
    const elem = ref.current;
    elem.focus();
    elem.addEventListener('keypress', handlePressEnter);
    return () => {
      elem.removeEventListener('keypress', handlePressEnter);
    };
  }, [setEditMode]);

  return (
    <input
      {...{ onChange, ref, className }}
      defaultValue={content}
      style={{ width: `calc(max(10ch, ${content.length + 'ch'}))` }}
    />
  );
}

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
          <DorkInput
            className="input"
            onChange={async e => await changeDork(id, e.target.value)}
            {...{ content, setEditMode }}
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
