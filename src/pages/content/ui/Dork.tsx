import { useState, useEffect, useRef, InputHTMLAttributes, Dispatch } from 'react';
import dorkStorage from '@src/shared/storages/dorkStorage';
import { FaCheck, FaXmark, FaPen } from 'react-icons/fa6';

interface DorkInputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly content: string;
  setEditMode: Dispatch<React.SetStateAction<boolean>>;
}

type DorkProps = {
  readonly content: string;
  readonly id: number;
};

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
            <FaCheck />
          </button>
          <button className="button dork__remove" onClick={async () => await removeDork(id)}>
            <FaXmark />
          </button>
        </div>
      ) : (
        <div className="dork__inner">
          <button className="button dork__inject" onClick={() => injectDork(content)}>
            {content}
          </button>
          <button className="button dork__edit" onClick={toggleEditMode}>
            <FaPen />
          </button>
          <button className="button dork__remove" onClick={async () => await removeDork(id)}>
            <FaXmark />
          </button>
        </div>
      )}
    </div>
  );
}

export default Dork;
