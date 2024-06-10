import React, { useState } from "react";
import { X, Plus } from "react-feather";

const AddList = (props) => {
  const [list, setlist] = useState("");
  const [show, setShow] = useState(false);

  const savelist = () => {
    if (!list) {
      return;
    }
    props.getlist(list);
    setlist("");
    setShow(!show);
  };

  const closeBtn = () => {
    setlist("");
    setShow(!show);
  };

  return (
    <div>
      <div className="flex flex-col h-fit flex-shrink-0 mr-3 w-60 rounded-md p-2 bg-pink-600">
        {show && (
          <div>
            <textarea
              value={list}
              onChange={(e) => setlist(e.target.value)}
              className="p-1 w-full rounded-md border-2 bg-pink-200 border-pink-400 text-pink-900"
              name=""
              id=""
              cols="30"
              rows="2"
              placeholder="Enter list Title..."
            ></textarea>
            <div className="flex p-1">
              <button
                onClick={() => savelist()}
                className="p-1 rounded bg-pink-500 text-white mr-2 hover:bg-pink-700"
              >
                Add list
              </button>
              <button
                onClick={() => closeBtn()}
                className="p-1 rounded bg-pink-400 text-white hover:bg-pink-600"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
        {!show && (
          <button
            onClick={() => setShow(!show)}
            className="flex p-1 w-full justify-center rounded items-center mt-1 bg-pink-400 text-white hover:bg-pink-600 h-8"
          >
            <Plus size={16} /> Add a list
          </button>
        )}
      </div>
    </div>
  );
};

export default AddList;
