import { useContext } from "react";
import { MoreHorizontal, UserPlus, Edit2 } from "react-feather";
import CardAdd from "./CardAdd";
import { BoardContext } from "../context/BoardContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddList from "./AddList";
import Utils from "../utils/Utils";

const Main = () => {
  const { allboard, setAllBoard } = useContext(BoardContext);
  const bdata = allboard.boards[allboard.active];

  function onDragEnd(res) {
    if (!res.destination) {
      console.log("No Destination");
      return;
    }
    const newList = [...bdata.list];
    const s_id = parseInt(res.source.droppableId);
    const d_id = parseInt(res.destination.droppableId);
    const [removed] = newList[s_id - 1].items.splice(res.source.index, 1);
    newList[d_id - 1].items.splice(res.destination.index, 0, removed);

    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  }

  const cardData = (e, ind) => {
    let newList = [...bdata.list];
    newList[ind].items.push({ id: Utils.makeid(5), title: e });

    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  };

  const listData = (e) => {
    let newList = [...bdata.list];
    newList.push({ id: newList.length + 1 + "", title: e, items: [] });

    let board_ = { ...allboard };
    board_.boards[board_.active].list = newList;
    setAllBoard(board_);
  };

  return (
    <div className="flex flex-col w-full bg-pink-200 text-black">
      <div className="p-3 bg-white text-black flex justify-between w-full bg-opacity-50 text-2xl">
        <h2 className="text-lg">{bdata.name}</h2>
        <div className="flex items-center justify-center">
          <button className="bg-pink-300 h-8 text-pink-900 px-2 py-1 mr-2 rounded flex justify-center items-center hover:bg-pink-400">
            <UserPlus size={16} className="mr-2"></UserPlus>
            Share
          </button>
          <button className="hover:bg-pink-400 px-2 py-1 h-8 rounded">
            <MoreHorizontal size={16}></MoreHorizontal>
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full flex-grow relative">
        <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden">
          <DragDropContext onDragEnd={onDragEnd}>
            {bdata.list &&
              bdata.list.map((x, ind) => {
                return (
                  <div
                    key={ind}
                    className="mr-3 w-60 h-fit rounded-md p-2 bg-pink-300 flex-shrink-0"
                  >
                    <div className="list-body">
                      <div className="flex justify-between p-1">
                        <span>{x.title}</span>
                        <button className="hover:bg-pink-400 p-1 rounded-sm">
                          <MoreHorizontal size={16}></MoreHorizontal>
                        </button>
                      </div>
                      <Droppable droppableId={x.id}>
                        {(provided, snapshot) => (
                          <div
                            className="py-1"
                            ref={provided.innerRef}
                            style={{
                              backgroundColor: snapshot.isDraggingOver
                                ? "#e91e63"
                                : "transparent",
                            }}
                            {...provided.droppableProps}
                          >
                            {x.items &&
                              x.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <div className="item flex justify-between items-center bg-pink-100 p-1 cursor-pointer rounded-md border-2 border-pink-300 hover:border-pink-400">
                                          <span>{item.title}</span>
                                          <span className="flex justify-start items-start">
                                            <button className="hover:bg-pink-300 p-1 rounded-sm text-black">
                                              <Edit2 size={16}></Edit2>
                                            </button>
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}

                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>

                      <CardAdd getcard={(e) => cardData(e, ind)}></CardAdd>
                    </div>
                  </div>
                );
              })}
          </DragDropContext>

          <AddList getlist={(e) => listData(e)}></AddList>
        </div>
      </div>
    </div>
  );
};

export default Main;
