import React from "react";
// import "./ListProduct.css";
import { useState, useEffect } from "react";
// import cart_cross_icon from "../../assets/cart_cross_icon.png";
import cart_cross_icon from '/cart_cross_icon.png'

const ListEvent = () => {
  const [allevents, setAllevents] = useState([]);

  const fetchInfo = async () => {
    await fetch("")
    // await fetch("http://localhost:4000/allevents")

      .then((res) => res.json())
      .then((data) => {
        setAllevents(data);
      });
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_event = async (_id) => {
    await fetch(``, {
    // await fetch(`http://localhost:4000/removeevent`, {
    
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    await fetchInfo();
    // .then((res) => res.json())
    // .then((data) => {
    //     if(data === "Product removed"){

    //     }
    // })
  };

  return (
    <div className="flex flex-col items-center w-full h-[740px] p-[10px_50px] m-7 rounded-md bg-white max-md:w-[95%] max-md:h-full max-md:p-[10px_30px] max-md:m-5 max-md:mx-auto">
      <h1>Liste des évènements</h1>
      <div className="  grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-2.5 w-full py-5 text-gray-700 text-base max-md:p-[15px_0px] max-md:text-gray-700 max-md:text-xs ">
        {/* <p>Products</p> */}
        <p>Nom de l'évènement</p>
        <p>Lieu</p>
        <p>Date</p>
        <p>Categorie</p>
        <p>Description</p>
        <p>Retirer</p>
      </div>
      <hr />
      {allevents.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-2.5 w-full py-5 text-gray-700 text-base w-full flex items-center font-medium border-b-[0.15rem] border-gray-200"
            >
              <img
                src={product.image}
                alt=""
                className="w-[80px] max-md:w-[60px]"
              />
              <p>{product.name}</p>
              <p>${product.lieu}</p>
              <p>${product.date}</p>
              <p>{product.category}</p>
              <p>{product.description}</p>

              <img
                src={cart_cross_icon}
                onClick={() => {
                  remove_event(product._id);
                }}
                className="cursor-pointer m-auto max-md:h-15"
                alt=""
              />
              <p>{product.remove}</p>
            </div>
      ))}
    </div>
  );
};

export default ListEvent;
