import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import { useEffect } from "react";

const BASE_URL = "https://frag-builder.herokuapp.com/api/components";

export default function ComputerParts(props) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      await axios
        .get(`${BASE_URL}/${props.type}/${search}`)
        .then(function (res) {
          console.log(res.data);
          setProducts(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
    fetchProducts();
    console.log(`${BASE_URL}/${props.type}/${search}`);
  }, [search, props.type]);

  return (
    <div>
      <div className="flex flex-row justify-center">
        <FontAwesomeIcon
          className="self-center"
          icon={faSearch}
        ></FontAwesomeIcon>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Začni hľadať"
        ></Input>
      </div>
      <div className="mx-auto overflow-y-scroll h-720p md:w-720p mb-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 container mx-auto my-10">
          {products.map((item) => (
            <div
              key={item.id}
              className="ont-mulish flex flex-col justify-between text-center  p-10  bg-white border-1 shadow full"
            >
              <h3>{item.model.toUpperCase()}</h3>
              <div className="my-3 mx-auto space-x-3">
                <Button className={"border-carbon-500 hover:bg-carbon-500"}>
                  <FontAwesomeIcon
                    className="mx-1 self-center"
                    icon={faShoppingCart}
                  />
                  {item.price} €
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
