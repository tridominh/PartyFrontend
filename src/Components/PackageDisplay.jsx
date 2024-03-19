/** @format */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PackageDisplay = ({ foodPack }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!foodPack) {
            throw new Error("Xài component FoodDisplay phải truyền foodPack");
        }
    
    })
  return (
    <ul className="foodMenu">
      {foodPack.map((item, i) => (
        <li
          className="foodMenuItem"
          key={i}
        >
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
            <div className="price">--- {item.price.toLocaleString()} VND ---</div>
            <div className="btnContainer">
                <button onClick={() => navigate(`/menu/${item.id}`)}>View Details</button>
                <button>Booking Now</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
