import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from "../assets/dropdown_icon.png";
import ProductsItem from "../Components/ProductsItem";
import axios from "axios";

const Filter = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState({});

  // Récupération des catégories depuis le backend

  // Récupérer les événements depuis le backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/evenement", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        });
        // Récupérer les catégories
        const cats = await axios.get("/api/categorie", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        })
        // console.log(response);
        // console.log(cats);
        const fullResponse = response.data.map(product => {
          let prodCat = cats.data.filter(cat => cat.id_categorie  === product.id_categorie);
          // console.log(prodCat)
          product.nom_categorie = prodCat[0].nom_categorie;
          
          return product;
        })
        // console.log('fullresponse: ', fullResponse)
        setProducts(fullResponse);

        // Récupérer les images pour chaque événement
        response.data.forEach(async (event) => {
          try {
            const imgResponse = await axios.get(`/api/evenement/${event.id_evenement}/image`);
            setImages((prev) => ({
              ...prev,
              [event.id_evenement]: imgResponse.data.image_url,
            }));
          } catch (error) {
            console.error("Erreur lors de la récupération de l'image :", error);
          }
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
      }
    };

    fetchEvents();
  }, []);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.nom_categorie));
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, products]);

  return (
    <div className="flex flex-col lg:flex-row gap-1 sm:gap-1 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTRES <img className={`h-3 lg:hidden ${showFilter ? "rotate-90" : ""}`} src={dropdown_icon} alt="" />
        </p>
        {/* CATEGORIE DE FILTRE */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} lg:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Football"} onChange={toggleCategory} /> Football
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Tennis"} onChange={toggleCategory} /> Tennis
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Handball"} onChange={toggleCategory} /> Handball
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Basketball"} onChange={toggleCategory} /> Basketball
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"VolleyBall"} onChange={toggleCategory} /> VolleyBall
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Baseball"} onChange={toggleCategory} /> Baseball
            </p>
          </div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="flex-1">
        {/* Map Product */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductsItem
              key={index}
              id={item.id_evenement}
              name={item.nom_evenement}
              image={["http://localhost:3000" + item.image_url]}
              date={new Date(item.date_debut).toLocaleDateString("fr-FR")}
              category={item.nom_categorie} lieu={item.lieu}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
