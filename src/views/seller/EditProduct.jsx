import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_category } from "../../store/Reducers/categoryReducerSlice";
import {
  get_product,
  messageClear,update_product,product_image_update
} from "../../store/Reducers/productReducerSlice";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import toast from "react-hot-toast";

export default function EditProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage, product } = useSelector(
    (state) => state.product
  );
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        parPage: "",
        page: "",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(get_product(productId));
  }, [dispatch, productId]);

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState(categories);
  const [searchValue, setSearchValue] = useState("");

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter(
          (c) => c && c.name && c.name.toLowerCase().includes(value.toLowerCase())
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categories);
    }
  };

  const [imageShow, setImageShow] = useState([]);

  const changeImage = async (img, files) => {
  if (files.length > 0) {
    const newImageFile = files[0];

    // Optimistically update imageShow with local preview
    const previewUrl = URL.createObjectURL(newImageFile);
    setImageShow((prev) => prev.map((i) => (i === img ? previewUrl : i)));

    await dispatch(product_image_update({
      oldImage: img,
      newImage: newImageFile,
      productId,
    }));

    // Fetch updated product from server for accurate state
    dispatch(get_product(productId));
  }
};

   useEffect(() => {
  if (product) {
    setState({
      name: product.name || "",
      description: product.description || "",
      discount: product.discount || "",
      price: product.price || "",
      brand: product.brand || "",
      stock: product.stock || "",
    });
    setCategory(product.category || "");
    setImageShow(product.images || []); 
  }
}, [product]);

useEffect(() => {
  if(categories.length > 0) {
    setAllCategory(categories)
  }
},[categories, dispatch])


    const update = (e) => {
        e.preventDefault()
        const obj = {
                name: state.name,
                description: state.description,
                discount: state.discount,
                price: state.price,
                brand: state.brand,
                stock: state.stock,
                category:category,
                productId: productId
        }
        dispatch(update_product(obj))
        console.log(obj)
    }

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">Edit Product</h1>
          <Link
            to={"/seller/dashboard/products"}
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-[#d0d2d6] text-sm px-7 py-2 font-semibold rounded-sm"
          >
            All Product
          </Link>
        </div>

        <div>
          <form onSubmit={update}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product Name</label>
                <input
                  className="px-4 py-1 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Product Name"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Product Brand</label>
                <input
                  className="px-4 py-1 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.brand}
                  type="text"
                  name="brand"
                  id="brand"
                  placeholder="Product Brand"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  onClick={() => setCateShow(!cateShow)}
                  className="px-4 py-1 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={category}
                  type="text"
                  id="category"
                  name="category"
                  placeholder="--Select Category--"
                />
                <div
                  className={`absolute top-[101%] bg-[#475569] w-full transition-all ${
                    cateShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden"
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scrool">
                    {allCategory.map((c, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          category === c.name && "bg-indigo-500"
                        }`}
                        onClick={() => {
                          setCateShow(false);
                          setCategory(c.name);
                          setSearchValue("");
                          setAllCategory(categories);
                        }}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Product Stock</label>
                <input
                  className="px-4 py-1 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.stock}
                  type="text"
                  name="stock"
                  id="stock"
                  placeholder="Stock"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Product Price</label>
                <input
                  className="px-4 py-1 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.price}
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Product Price"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  className="px-4 py-1 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.discount}
                  type="number"
                  name="discount"
                  id="discount"
                  placeholder="Product discount by %"
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="description" className="text-[#d0d2d6]">
                Description
              </label>

              <textarea
                className="px-4 py-1 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6] mb-4"
                onChange={inputHandle}
                value={state.description}
                type="text"
                name="description"
                id="description"
                placeholder="Product description"
                cols="7"
                rows="4"
              />
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              {imageShow?.map((img, i) => (
                <div key={i}>
                  <label htmlFor={i} className="cursor-pointer">
                    <img src={img} alt="" className="w-full h-full" />
                  </label>
                  <input
                    onChange={(e) => changeImage(img, e.target.files)}
                    type="file"
                    id={i}
                    className="hidden"
                  />
                </div>
              ))}
            </div>

            <button
              disabled={loader ? true : false}
              className="min-w-[280px] bg-red-700 hover:shadow-red-400/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-3"
            >
              {loader ? (
                <PropagateLoader color="white" cssOverride={overrideStyle} />
              ) : (
                "Update Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
