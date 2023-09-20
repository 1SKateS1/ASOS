import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IProductCreate } from "../types";
import { Field, Formik, useFormik } from "formik";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import { showCategory } from "../../../../../store/actions/Categories/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/reducers/rootReducer";
import { CreateProduct } from "../../../../../store/actions/ProductActions";
import { CreateProductSchema } from "../../../validation/ProductCreateValidationSchema";
import { useActions } from "../../../../../hooks/useActions";

const ProductCreate = () => {
  const navigator = useNavigate();
  var [imagesToShow, setImagesToShow] = useState([]);
  var [filesToSend, setFilesToSend] = useState([]);
  const { CreateProduct } = useActions();
  const disp = useDispatch();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [model, setModel] = useState<IProductCreate>({
    name: "",
    price: 0,
    discount: 0,
    description: "",
    color: "",
    size: "",
    brand: "",
    quantity: 0,
    isInTheStock: false,
    categoryId: 0,
    images: "",
  });

  const toBase64: any = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  function getFileExtension(filename: any) {
    const extension = "." + filename.split(".").pop();
    return extension;
  }

  const handleDeleteImg = (img: any) => {
    var index = imagesToShow.findIndex((img_: any) => img_ == img);
    var imagesToShow_tmp = imagesToShow.filter((img_: any) => {
      return img_ != img;
    });
    setImagesToShow(imagesToShow_tmp);

    setFilesToSend(
      filesToSend.filter((file: any) => {
        return filesToSend.findIndex((file_2: any) => file_2 == file) != index;
      })
    );
  };

  const HandleFileSelection = async (event: any) => {
    const files = event.target.files;

    console.log("Files:", files);

    var imagesBytes: any = [];
    for (var it = 0; it < files.length; it++) {
      imagesBytes.push(files[it]);
    }
    setFilesToSend(imagesBytes);

    try {
      const imagesBytes_toSend = await Promise.all(promises);
      console.log(imagesBytes_toSend);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeCategorySelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setModel({ ...model, [e.target.name]: e.target.value });
  };
  const onChangeSizeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModel({ ...model, [name]: value });

    if (name === "size") {
      setSelectedSize(value);
    }
  };
  const onChangeBrandSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModel({ ...model, [name]: value });

    if (name === "brand") {
      setSelectedBrand(value);
    }
  };
  const onChangeColorSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModel({ ...model, [name]: value });

    if (name === "color") {
      setSelectedColor(value);
    }
  };

  const promises = filesToSend.map((img: any) => {
    return new Promise((resolve) => {
      let byte_img = toBase64(img);
      byte_img.then((res: any) => {
        let res_byte_img = res.split(",")[1];
        let ext = getFileExtension(img.name);

        resolve({ data: res_byte_img, extension: ext });
        console.log("files_to_send");
        console.log(filesToSend);
      });
    });
  });

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    Promise.all(promises).then((imagesBytes_toSend) => {
      const newProduct: IProductCreate = {
        name: data.get("name")?.toString()!,
        price: Number(data.get("price")),
        discount: Number(data.get("discount")),
        description: data.get("description")?.toString()!,
        color: data.get("color")?.toString()!,
        size: data.get("size")?.toString()!,
        brand: data.get("brand")?.toString()!,
        quantity: Number(data.get("quantity")),
        isInTheStock: Boolean(data.get("isInTheStock")),
        categoryId: Number(data.get("categoryId")),
        images: imagesBytes_toSend,
      };
      console.log("new product: ", newProduct);
      CreateProduct(newProduct);
    });
  };

  const fetchCat = async () => {
    const response = await axios.get(
      "http://localhost:5056/api/Category/getAllCategories"
    );
    disp(showCategory(response.data.payload));
  };

  useEffect(() => {
    fetchCat();
  }, []);

  const cat = useSelector((state: RootState) => state.allCategory.categories);

  const categories = cat.map((category: any) => {
    const { id, name } = category;
    return (
      <option key={category.id} value={category.id}>
        {name}
      </option>
    );
  });
  const { loading, message } = useTypedSelector(
    (store) => store.ProductsReducer
  );
  if (message == "Successful request create product") {
    return <Navigate to={"/admin/products"} />;
  }
  const productType = [
    { name: "Swimwear" },
    { name: "Tops" },
    { name: "T-shirts" },
    { name: "Dresses" },
    { name: "Skirts" },
    { name: "Shorts" },
    { name: "Jeans" },
    { name: "Trousers" },
    { name: "Cardigans" },
    { name: "Jackets" },
    { name: "Hoodies" },
    { name: "Sweaters" },
    { name: "Shoes" },
  ];

  return (
    <>
      <ToastContainer draggable={false} autoClose={3000} />
      <Formik
        initialValues={model}
        validationSchema={CreateProductSchema}
        onSubmit={(e) => {
          console.log("E", e);
        }}
      >
        {({ errors, touched, isValid, dirty }) => (
          <div className="new">
            <Sidebar />
            <div className="newContainer">
              <Navbar />
              <div className="top">
                <h1>ADD PRODUCT</h1>
              </div>
              <div className="bottom">
                <form onSubmit={onSubmitHandler}>
                  <div className="container">
                    <div>
                      <h1 className="header">ADD PRODUCT</h1>
                      <div>
                        <div>
                          <label className="label">Name</label>

                          <Field
                            className="input"
                            type="text"
                            name="name"
                            required
                            id="name"
                            placeholder="Enter the product name"
                          />

                          {errors.name && touched.name ? (
                            <div style={{ color: "red" }}>{errors.name}</div>
                          ) : null}
                        </div>
                        <div>
                          <label className="label">Price</label>

                          <Field
                            as="input"
                            type="number"
                            name="price"
                            id="price"
                            className="input"
                            placeholder="Enter the product price"
                            required
                          />
                          {errors.price && touched.price ? (
                            <div style={{ color: "red" }}>{errors.price}</div>
                          ) : null}
                        </div>
                        <div>
                          <label className="label">Discount</label>

                          <Field
                            as="input"
                            type="number"
                            name="discount"
                            id="discount"
                            className="input"
                            placeholder="Enter the product discount"
                            required
                          />
                        </div>
                        <div>
                          <label className="label">Description</label>

                          <Field
                            htmlFor="description"
                            as="textarea"
                            id="description"
                            name="description"
                            rows={4}
                            cols={5}
                            className="input"
                            placeholder="Enter the product description"
                            required
                          ></Field>
                          {errors.description && touched.description ? (
                            <div style={{ color: "red" }}>
                              {errors.description}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <label className="label">Color</label>

                          <select
                            onChange={onChangeColorSelectHandler}
                            id="color"
                            name="color"
                            className="input"
                            value={selectedColor}
                          >
                            <option value="" disabled>
                              Select color
                            </option>
                            <option value="Red">Red</option>
                            <option value="Orange">Orange</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Green">Green</option>
                            <option value="Blue">Blue</option>
                            <option value="Navy">Navy</option>
                            <option value="Beige">Beige</option>
                            <option value="Gray">Gray</option>
                            <option value="Purple">Purple</option>
                            <option value="Pink">Pink</option>
                            <option value="Turquoise">Turquoise</option>
                            <option value="Brown">Brown</option>
                            <option value="White">White</option>
                            <option value="Black">Black</option>
                            <option value="Multicolor">Multicolor</option>
                          </select>
                          {errors.color && touched.color ? (
                            <div style={{ color: "red" }}>{errors.color}</div>
                          ) : null}
                        </div>
                        <div>
                          <label className="label">Size</label>

                          <select
                            onChange={onChangeSizeSelectHandler}
                            id="size"
                            name="size"
                            className="input"
                            value={selectedSize}
                          >
                            <option value="" disabled>
                              Select size
                            </option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                            <option value="XXXL">XXXL</option>
                          </select>
                          {errors.size && touched.size ? (
                            <div style={{ color: "red" }}>{errors.size}</div>
                          ) : null}
                        </div>
                        <div>
                          <label className="label">Brand</label>

                          <select
                            onChange={onChangeBrandSelectHandler}
                            id="brand"
                            name="brand"
                            className="input"
                            value={selectedBrand}
                          >
                            <option value="" disabled>
                              Select brand
                            </option>
                            <option value="Topshop">Topshop</option>
                            <option value="Nike">Nike</option>
                            <option value="Adidas">Adidas</option>
                            <option value="Bershka">Bershka</option>
                            <option value="Pull & Bear">Pull & Bear</option>
                            <option value="Stradivarius">Stradivarius</option>
                            <option value="Monki">Monki</option>
                            <option value="The North Face">
                              The North Face
                            </option>
                            <option value="Converse">Converse</option>
                            <option value="River Island">River Island</option>
                          </select>

                          {errors.brand && touched.brand ? (
                            <div style={{ color: "red" }}>{errors.brand}</div>
                          ) : null}
                        </div>
                        <div>
                          <label className="label">Quantity</label>

                          <Field
                            as="input"
                            type="number"
                            name="quantity"
                            id="quantity"
                            className="input"
                            placeholder="Enter the product quantity"
                            required
                          />
                          {errors.quantity && touched.quantity ? (
                            <div style={{ color: "red" }}>
                              {errors.quantity}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <label className="label">Select category</label>
                          <select
                            onChange={onChangeCategorySelectHandler}
                            id="categoryId"
                            name="categoryId"
                            className="input"
                          >
                            <option selected>Select category</option>
                            {categories}
                          </select>
                        </div>
                        <div className=" rounded-full flex flex-col mb-4">
                          <span>Select Images</span>

                          <input
                            onChange={HandleFileSelection}
                            name="Images"
                            id="Images"
                            multiple
                            type="file"
                            className="hidden"
                          />
                          <label
                            htmlFor="Images"
                            className=" bg-yellowForInputs hover:opacity-90 text-[15px] mediumFont outline-none rounded-full h-10 pl-3 pr-3 flex justify-center items-center cursor-pointer"
                          >
                            Upload Images
                          </label>
                        </div>
                        Click to delete image
                        <div className="grid grid-cols-5 gap-5 transition-all">
                          {imagesToShow.map((img: any, it: any) => (
                            <div
                              onClick={() => {
                                handleDeleteImg(img);
                              }}
                              key={it}
                              className="imageToShow"
                              style={{
                                backgroundImage: "url(" + img + ")",
                                backgroundPosition: "center",
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="label">
                          A product is in the stock
                        </label>

                        <Field
                          type="checkbox"
                          name="isInTheStock"
                          id="isInTheStock"
                          required
                          className="checkbox"
                        />
                        {errors.isInTheStock && touched.isInTheStock ? (
                          <div style={{ color: "red" }}>
                            {errors.isInTheStock}
                          </div>
                        ) : null}
                      </div>
                      <div className="space-x-4 mt-8">
                        <button
                          type="submit"
                          className="womenbtn buttons"
                          // disabled={!(isValid && dirty)}
                          // onClick={() => navigator("/admin/products")}
                        >
                          Save
                        </button>
                        <button
                          className="buttons"
                          onClick={() => navigator("/admin/products")}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default ProductCreate;
