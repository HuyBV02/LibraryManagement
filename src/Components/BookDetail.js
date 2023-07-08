import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { DataArray } from "@mui/icons-material";


const navigation1 = [
  { name: "Trang chủ", href: "/books", current: true },
  { name: "QLND", href: "/users", current: false },
  // { name: "Đơn hàng", href: "#", current: false },
];
const navigation2 = [
  { name: "Trang chủ", href: "/books", current: true },

  { name: "Giỏ hàng", href: `/carts/${window.localStorage.getItem("username")}`, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// const breadcrumb = { name: "Book", href: "/books" };

function BookDetail() {
  const navigation = useNavigate();
  const [book, setBook] = useState({
    id: "",
    tieude: "",
    tacgia: "",
    mota: "",
    theloai: "",
    ngayphathanh: "",
    sotrang: "",
    img: "",
  });

  const [cmts, setCmts] = useState([]);
  const { id } = useParams();

  const [comment, setComment] = useState({
    username: window.localStorage.getItem('username'),
    idbook: id,
    cmt: "",
  });

  const [msg, setMsg] = useState("");
  const [formUpdate, setFormUpdate] = useState(book);
  const [formAddCmt, setFormAddCmt] = useState(comment);
  const [role, setRole] = useState();
  const [login, setLogin] = useState();
  const [cart, setCart] = useState(
    {
      username: window.localStorage.getItem('username'),
      idbook: id,
      tensach: "",
      soluong: 0,
    }
  );
  const [isRated, setIsRated] = useState(false);
  const [isCmted, setIsCmted] = useState(false);
    const [isChangeImg, setIsChangeImg] = useState(false)
  useEffect(() => {
    const storedData = window.localStorage.getItem("role");
    if (storedData) {
      setRole(storedData);
    }
    const checkLogin = window.localStorage.getItem("isLogin");
    if (checkLogin) {
      setLogin(checkLogin);
    }
  }, []);

  const handleLogout = () => {
    setRole("");
    setLogin("");
    window.localStorage.setItem("username", "");
    window.localStorage.setItem("password", "");
    window.localStorage.setItem("fullname", "");
    window.localStorage.setItem("role", "");
    window.localStorage.setItem("isLogin", false);

    window.location.href = "/login";
  };

  const [deleted, setDeleted] = useState(false);

  const handleChange1 = (event) => {
    setComment({
      ...comment,
      cmt: event.target.value
    })
  };

  const handleChange2 = (event) => {
    let isExited = false
    const starsChanged = stars.map(star => {
      if (star.idbook === Number(id)) {
        star.star = event.target.value
        console.log(star)
        isExited = true
      }
      return star
    })
    console.log(starsChanged)
    console.log(stars)

    const starCommit = {
      ...star,
      star: event.target.value
    }
    if (isExited) {
      fetch("http://localhost:8080/star/all", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(starsChanged),
      })
        .then((response) => {
          // handle response
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          alert(data);
          navigate(`/book/${id}`, { replace: true });
          // console.log(data);
        })
        .catch((error) => {
          // handle error
          setMsg(error);
          console.log(msg);
        });
    } else {
      fetch("http://localhost:8080/star/0", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(starCommit),
      })
        .then((response) => {
          // handle response
          if (response.ok) {
            setIsRated(!isRated)
            return response.json();
          }
        })
        .then((data) => {
          alert(data);
          navigate(`/book/${id}`, { replace: true });
          // console.log(data);
        })
        .catch((error) => {
          // handle error
          setMsg(error);
          console.log(msg);
        });
    }
  };

  const handleChangeCart = (event) => {
    setCart({
      ...cart,
      soluong: event.target.value
    })
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (
      window.confirm(`Are you sure to delete cmt ${e.target.dataset.id}`) === true
    ) {
      fetch(`http://localhost:8080/cmts/delete/${e.target.dataset.id}`, {
        method: "DELETE",
      })
        .then((response) => response.text())
        .then((data) => {
          alert(data);
          setDeleted(!deleted);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8080/cmts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCmts(data);
      })
      .catch((err) => console.log(err));
  }, [deleted, isCmted]);


  // Danh gia

  const [stars, setStars] = useState([])
  const [star, setStar] = useState(
    {
      username: window.localStorage.getItem('username'),
      idbook: id,
      star: 0,
    }
  );

  useEffect(() => {
    fetch(`http://localhost:8080/search/${window.localStorage.getItem("username")}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStars(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [isRated]);

  const handleCancel = () => {
    if (
      window.confirm(
        `Are you sure to cancel ${id !== "0" ? "save" : "add"} this book ?`
      )
    ) {
      alert("Cancel!");
      navigation("/books", { replace: true });
    }
  };

  const confirmMsg =
    id === "0"
      ? "Are you sure to add this book?"
      : "Are you sure to update this book?";

  const confirmMsgCmt = "Are you sure to add this comment?";
  const confirmMsgCart = "Are you sure to add this item to cart?";
  const navigate = useNavigate();

  const handleChange = (event) => {
    setBook({ ...book, [event.target.name]: event.target.value });
    // console.log(formUpdate);
  };

  // const handleChangeInputFile = (e) => {
  //   if (e.target.value) {
  //     const file = e.target.files[0];
  //     setBook({ ...book, img: "img/" + file.name });
  //     console.log(book)
  //     const img = document.getElementById("book-card-img")
  //     console.log(img)
  //     img.src = file.name;
  //     console.log(img)

  //   }

  // };
  const handleChangeInputFile = (e) => {
    const bookImg = document.querySelector("#book-card-img");
    const file = e.target.files[0];
    if (file) {
      setBook({ ...book, img: "img/" + file.name });
      const reader = new FileReader(); // Tạo một đối tượng FileReader

      reader.onload = () => {
        bookImg.setAttribute("src", reader.result); // Lấy dữ liệu ảnh dưới dạng URL

        // Sử dụng imageDataURL theo nhu cầu của bạn (ví dụ: hiển thị hoặc gửi đi)
      };
      reader.readAsDataURL(file); // Đọc tệp ảnh dưới dạng URL
    } else {
      setBook({ ...book, img: "" });
    }
  };



  const handleClickEditBtn = (e) => {
    e.preventDefault();
    e.target.classList.add("hidden");
    const btnSave = document.getElementById("save-btn");
    const inputs = document.querySelectorAll("[disabled]");
    inputs.forEach((input) => input.removeAttribute("disabled"));
    btnSave.classList.remove("hidden");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (window.confirm(confirmMsg) === true) {
      fetch(`http://localhost:8080/book/${id}`, {
        method: id === "0" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formUpdate),
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          }
        })
        .then((data) => {
          alert(data);
          navigate("/books", { replace: true });
        })
        .catch((error) => {
          setMsg(error);
          console.log(msg);
        });
    }
  };

  const handleSubmitCmts = (event) => {
    event.preventDefault();

    if (window.confirm(confirmMsgCmt) === true) {
      fetch("http://localhost:8080/cmt/0", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      })
        .then((response) => {
          // handle response
          if (response.ok) {
            setIsCmted(!isCmted)
            return response.json();
          }
        })
        .then((data) => {
          alert(data);
          navigate(`/book/${id}`, { replace: true });
          // console.log(data);
        })
        .catch((error) => {
          // handle error
          setMsg(error);
          console.log(msg);
        });
    }
  };

  const handleSubmitCart = (event) => {
    event.preventDefault();
    const cartWithBook = { ...cart, tensach: book.tieude }

    if (window.confirm(confirmMsgCart)) {
      fetch("http://localhost:8080/cart/0", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartWithBook),
      })
        .then((response) => {
          // handle response
          if (response.ok) {
            return response.text();
          }
        })
        .then((data) => {
          alert(data);
          navigate(`/book/${id}`, { replace: true });
          // console.log(data);
        })
        .catch((error) => {
          // handle error
          setMsg(error);
          console.log(msg);
        });
    }

  };

  useEffect(() => {
    setFormUpdate(book);
  }, [book]);


  useEffect(() => {
    if (id !== "0") {
      fetch(`http://localhost:8080/book/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setBook(data);
          setFormUpdate(data);
        })
        .catch((err) => console.log(err));
    }
  }, [id, cmts, cart]);

  return (

    <>

      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>

                  {role === "ADMIN" ? (
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {navigation1.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {navigation2.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition

                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      {login === "true" ? (
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Cá nhân
                              </a>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={handleLogout}
                              >
                                Đăng xuát
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      ) : (
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                href="/login"
                              >
                                Đăng nhập
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      )}
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation1.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>


      {role === "ADMIN" ? (
        <form id="formAction" className="mx-8" onSubmit={handleSubmit}>
          <div className="space-y-12 w-full h-full bg-white rounded-lg mt-8">
            <div className="border-b border-gray-900/10 py-4">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 mx-8 lg:grid-cols-2">
                <div className="flex flex-col">
                  <div className="flex ">
                    <div className="mr-4 w-1/2">
                      <label
                        htmlFor="tieude"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Tiêu đề (*)
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="tieude"
                            id="tieude"
                            className="disabled:cursor-not-allowed block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Tiêu đề"
                            value={book.tieude}
                            onChange={handleChange}
                            required
                            disabled={id !== "0" ? true : false}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-1/2">
                      <label
                        htmlFor="tacgia"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Tác giả (*)
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="tacgia"
                            id="tacgia"
                            className="disabled:cursor-not-allowed block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Tác giả"
                            value={book.tacgia}
                            onChange={handleChange}
                            required
                            disabled={id !== "0" ? true : false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="mieuta"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Mô tả về sách
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="mieuta"
                        rows="4"
                        name="mieuta"
                        className="disabled:cursor-not-allowed block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                        value={book.mieuta}
                        onChange={handleChange}
                        placeholder="Thêm mô tả cho sách"
                        disabled={id !== "0" ? true : false}
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-1/2 mr-4">
                      <label
                        htmlFor="ngayphathanh"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Ngày phát hành (*)
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="date"
                            name="ngayphathanh"
                            id="ngayphathanh"
                            className="disabled:cursor-not-allowed block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Ngày phát hành"
                            value={book.ngayphathanh}
                            onChange={handleChange}
                            required
                            disabled={id !== "0" ? true : false}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-1/2">
                      <label
                        htmlFor="sotrang"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Số trang
                      </label>
                      <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="number"
                          id="sotrang"
                          name="sotrang"
                          className="disabled:cursor-not-allowed block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          required
                          min={1}
                          max={999}
                          step={1}
                          onChange={handleChange}
                          placeholder="Số trang"
                          value={book.sotrang}
                          disabled={id !== "0" ? true : false}
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="theloai"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Thể loại (*)
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <select
                          type="text"
                          name="theloai"
                          id="theloai"
                          className="disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                          placeholder="Thể loại"
                          value={book.theloai}
                          onChange={handleChange}
                          required
                          disabled={id !== "0" ? true : false}
                        >
                          <option value="" hidden>
                            -- Chọn thể loại --
                          </option>
                          <option value="Trinh Thám">Trinh Thám</option>
                          <option value="Ngôn Tình">Ngôn tình</option>
                          <option value="Phiêu Lưu">Phiêu lưu</option>
                          <option value="Tình Cảm">Tình cảm</option>
                          <option value="Tâm Lý">Tâm lý</option>
                          <option value="Tiểu Thuyết">Tiểu Thuyết</option>
                          <option value="Tài Liệu Tham Khảo">
                            Tài Liệu Tham Khảo
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center overflow-hidden">
                  <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                      onChange={handleChangeInputFile}
                      disabled={id !== "0" ? true : false}
                      type="file"
                      name="img"
                      className="disabled:cursor-not-allowed cursor-pointer block w-full text-sm text-slate-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-violet-50 file:text-violet-700
                              hover:file:bg-violet-100"
                    />
                  </label>

                  <div className="max-h-full justify-center flex">
                    <img
                      id="book-card-img"
                      className="min-h-300 max-h-80 object-cover"
                      src={"../" + book.img}
                      alt="Book Card"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6 mr-24">
                {role === "ADMIN" ? (
                  (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="text-sm font-semibold leading-6 text-gray-900 px-8"
                    >
                      Cancel
                    </button>
                  ) && id !== "0" ? (
                    <div>
                      <button
                        onClick={handleClickEditBtn}
                        type="button"
                        className="px-8 rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit
                      </button>
                      <button
                        id="save-btn"
                        type="submit"
                        className="hidden px-8 rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="px-8 rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add
                    </button>
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="formCart">
            <form id="formAction" className="mx-8" onSubmit={handleSubmit}>
              <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div className="container px-5 py-24 mx-auto">
                  <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200 hinhdetail" src={"../" + book.img} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                      <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{book.tieude}</h1>
                      <h2 className="text-sm title-font text-gray-500 tracking-widest">{book.tacgia}</h2>
                      <br /><br />
                      <p className="leading-relaxed">{book.mieuta}</p>
                      <br /><br />

                      {/* <div className="flex">
                      <span className="title-font font-medium text-2xl text-gray-900">{book.price}</span>
                      <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Add to cart</button>
                    </div> */}
                    </div>
                  </div>
                </div>
              </section>
            </form>
            <form id="formAddCart" onSubmit={handleSubmitCart}>
              <div className="mb-3 row hidden">
                <label htmlFor="username" className="col-sm-2 col-form-label">
                  Username
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control-plaintext"
                    id="username"
                    value={comment.username}
                    Hidden
                  />
                </div>
              </div>
              <div className="mb-3 row hidden" >
                <label htmlFor="idbook" className="col-sm-2 col-form-label">
                  Idbook
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    id="idbook"
                    value={id}
                  />
                </div>
              </div>

              <div className="mb-3 row hidden">
                <label htmlFor="tensach" className="col-sm-2 col-form-label">
                  Ten sach <br />
                </label>

                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="tensach"
                    value={book.tieude}
                  />
                </div>
              </div>
              <div className="mb-3 row" >
                <label htmlFor="soluong" className="col-sm-2 col-form-label">
                  Soluong
                </label>
                <div className="col-sm-10">
                  <input
                    style={{ width: '50%' }}
                    type="number"
                    className="form-control"
                    id="soluong"
                    min={1}
                    max={999}
                    step={1}
                    value={cart.soluong}
                    onChange={handleChangeCart}
                  />
                </div>
              </div>
              <button type="submit button" className="btn btn-primary">Add to Cart</button>
            </form>
          </div>






          {/* <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <StarIcon
                            key={rating}
                            data-id={rating}
                            onClick={handleSumbitRating}
                            className={classNames(
                              averageRate >= rating
                                ? "text-amber-200"
                                : "text-gray-200",
                              "h-5 w-5 flex-shrink-0 cursor-pointer hover:text-amber-200"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{averageRate} out of 5 stars</p>
                      <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        {averageRate}/5 ({book.rate.length} đánh giá)
                      </p>
                    </div>
                  </div> */}







          {/* <form id="formAddCmt">
            <div class="rating">
              <label>
                <input type="radio" name="stars" value="1" />
                <span className="icon">★</span>
              </label>
              <label>
                <input type="radio" name="stars" value="2" />
                <span className="icon">★</span>
                <span className="icon">★</span>
              </label>
              <label>
                <input type="radio" name="stars" value="3" />
                <span className="icon">★</span>
                <span className="icon">★</span>
                <span className="icon">★</span>
              </label>
              <label>
                <input type="radio" name="stars" value="4" />
                <span className="icon">★</span>
                <span className="icon">★</span>
                <span className="icon">★</span>
                <span className="icon">★</span>
              </label>
              <label>
                <input type="radio" name="stars" value="5" />
                <span className="icon">★</span>
                <span className="icon">★</span>
                <span className="icon">★</span>
                <span className="icon">★</span>
                <span className="icon">★</span>
              </label>
            </div>
            <button className="btn btn-info" type="submit button">Danhj gia</button>
          </form> */}

          <form id="formAddStar" >
            <div className="mb-3 row hidden">
              <label htmlFor="username" className="col-sm-2 col-form-label">
                Username
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control-plaintext"
                  id="username"
                  value={star.username}
                  Hidden
                />
              </div>
            </div>
            <div className="mb-3 row hidden" >
              <label htmlFor="idbook" className="col-sm-2 col-form-label">
                Idbook
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="idbook"
                  value={id}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="star" className="col-sm-2 col-form-label">
                Danh gia <br />
              </label>

              <div className="col-sm-10">
                <select
                  type="number"
                  name="star"
                  id="star"
                  className="disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  value={stars.length > 0 && stars.find(star => star.idbook === Number(id)) && stars.find(star => star.idbook === Number(id)).star}
                  onChange={handleChange2}
                // required
                >
                  <option value="" hidden>
                    -- Đánh giá --
                  </option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>

                </select>
              </div>
            </div>

          </form>



          <form id="formAddCmt" onSubmit={handleSubmitCmts}>
            <div className="mb-3 row hidden">
              <label htmlFor="username" className="col-sm-2 col-form-label">
                Username
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control-plaintext"
                  id="username"
                  value={comment.username}
                  Hidden
                />
              </div>
            </div>
            <div className="mb-3 row hidden" >
              <label htmlFor="idbook" className="col-sm-2 col-form-label">
                Idbook
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="idbook"
                  value={id}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label htmlFor="cmt" className="col-sm-2 col-form-label">
                Comment <br />
              </label>

              <div className="col-sm-10">
                <textarea
                  required
                  type="text"
                  className="form-control"
                  id="cmt"
                  value={comment.cmt}
                  onChange={handleChange1}
                />
              </div>
            </div>

            <button type="submit button" className="btn btn-primary">Add Comment</button>
          </form>

          {/* {stars.map((star) => (

            <div className="" key={star.id}>
              Damh gia

              <div> {star.star}</div>


            </div>
          ))} */}

          {cmts.map((cmt) => (
            <div key={cmt.id}>
              <div className="container my-1 py-1 text-dark" >
                <div className="row d-flex justify-content-center">
                  <div className="col-md-8 col-lg-5 col-xl-5">
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="d-flex flex-start">
                          <img className="rounded-circle shadow-1-strong me-3"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp" alt="avatar" width="40"
                            height="40" />
                          <div className="w-100">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h6 className="text-primary fw-bold mb-0">
                                {cmt.username}
                                <span className="text-dark ms-2">{cmt.cmt}</span>
                              </h6>

                              {cmt.username === window.localStorage.getItem("username") ? (
                                <button data-id={cmt.id} onClick={handleDelete} className="btn btn-danger">Delete</button>

                              ) : (
                                <></>
                              )}

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default BookDetail;
