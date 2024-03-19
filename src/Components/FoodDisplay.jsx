/** @format */

import { useEffect } from "react";

export const FoodDisplay = ({ menu }) => {
  useEffect(() => {
    console.log(menu)
    if (!menu) {
      throw new Error("Xài component FoodDisplay phải truyền menu");
    }
  });
  return (
    <ul className="foodMenu">
      {menu.map((item, i) => (
        <li className="foodMenuItem" key={i}>
          <img
            className="foodMenuImg"
            src={item.img}
          />
          <div className="foodMenuName">{item.name}</div>
          <div className="foodMenuDescription">
            <ul>
              {item.description.map((descript, i) => (
                <li key={i}>{descript}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
};
