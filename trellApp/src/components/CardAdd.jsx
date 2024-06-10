import React, { useState } from "react";
import { X, Plus } from "react-feather";

const CardAdd = (props) => {
  const [card, setCard] = useState("");
  const [show, setShow] = useState(false);

  const saveCard = () => {
    if (!card) {
      return;
    }
    props.getcard(card);
    setCard("");
    setShow(!show);
  };

  const closeBtn = () => {
    setCard("");
    setShow(!show);
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col p-2 bg-pink-500">
        {show && (
          <div>
            <textarea
              value={card}
              onChange={(e) => setCard(e.target.value)}
              className="p-5 w-full rounded-md border-2 bg-pink-100 border-pink-300 text-pink-900"
              name=""
              id=""
              cols="30"
              rows="2"
              placeholder="Enter Card ..."
            ></textarea>
            <div className="flex p-1">
              <button
                onClick={() => saveCard()}
                className="p-1 rounded bg-pink-600 text-white mr-2 hover:bg-pink-700"
              >
                Add Card
              </button>
              <button
                onClick={() => closeBtn()}
                className="p-1 rounded bg-pink-300 text-pink-900 hover:bg-pink-400"
              >
                <X size={16}></X>
              </button>
            </div>
          </div>
        )}
        {!show && (
          <button
            onClick={() => setShow(!show)}
            className="flex p-1 w-full justify-start rounded items-center mt-1 bg-pink-300 text-pink-900 hover:bg-pink-400 h-8"
          >
            <Plus size={16}></Plus> Add a card
          </button>
        )}
      </div>
    </div>
  );
};

export default CardAdd;
