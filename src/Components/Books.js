import { useEffect, useState, Fragment } from "react";
import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const navigation = [
  { name: "Trang chủ", href: "/books", current: true },
  { name: "QLND", href: "/users", current: false },
  // { name: "Đơn hàng", href: "#", current: false },
];
const navigation1 = [
  { name: "Trang chủ", href: "/books", current: true },

  { name: "Giỏ hàng", href: `/carts/${window.localStorage.getItem("username")}`, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Books(props) {
  const [books, setBooks] = useState([]);
  const [booksOnFilter, setBooksOnFilter] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [role, setRole] = useState();
  const [login, setLogin] = useState();
  const [giohang, setGiohang] = useState();
  const [username, setUsername] = useState();


  // const [open, setOpen] = useState(false);
  //  const navigation = useNavigate();
  // const [cart, setCart] = useState(window.localStorage.getItem("giohang") !== "" ? JSON.parse(window.localStorage.getItem("giohang")) : []);
  // const [isGiohangChanged, setIsGiohangChanged] = useState(false);


  useEffect(() => {
    const storedData = window.localStorage.getItem("role");
    if (storedData) {
      setRole(storedData);
    }

    const checkLogin = window.localStorage.getItem("isLogin");
    if (checkLogin) {
      setLogin(checkLogin);
    }
    // const checkGiohang = window.localStorage.getItem("giohang");
    // if (checkGiohang) {
    //   setLogin(checkGiohang);
    // }
    // const checkUsername = window.localStorage.getItem("username");
    // if (checkUsername) {
    //   setLogin(checkUsername);
    // }
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

  // useEffect(() => {
  //   if (window.localStorage.getItem("giohang") !== "") {
  //     setCart(JSON.parse(window.localStorage.getItem("giohang")));
  //   }
  //   setIsGiohangChanged(!isGiohangChanged);

  // }, [deleted, window.localStorage.getItem("fullname"), window.localStorage.getItem("isLogin")]);




  // const handleRemoveItemCart = (e) => {
  //   e.preventDefault();
  //   if (window.confirm(`Bạn có muốn xóa hết sách này ở giỏ hàng không?`)) {
  //     const cartWithRemove = giohang.filter(
  //       (item) => item.id !== Number(e.target.dataset.id)
  //     );

  //     const formRemoveCartItem = {
  //       username: username,
  //       giohang: JSON.stringify(cartWithRemove),
  //     };

  //     setCart(cartWithRemove);
  //     setIsGiohangChanged(!isGiohangChanged);
  //     fetch("PUT", `api/user/save/cart`, formRemoveCartItem)
  //       .then((response) => response.data)
  //       .then((data) => console.log(data))
  //       .catch((error) => console.log(error));

  //   }
  // };


  const handleView = (e) => {
    e.preventDefault();
    const formAction = document.getElementById("formAction");
    formAction.setAttribute("action", `book/${e.target.dataset.id}`);
    formAction.submit();
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (
      window.confirm(`Are you sure to delete book ${e.target.dataset.id}`) === true
    ) {

      fetch(`http://localhost:8080/books/delete/${e.target.dataset.id}`, {
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
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        //setBooksOnFilter(data);
      })
      .catch((err) => console.log(err));
  }, [deleted]);

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
                        {navigation.map((item) => (
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
                {navigation.map((item) => (
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
        <form id="formAction" method="" action="">
          <div className="container">
            <div className="row">
              <h1 className="listbook">List Books</h1><hr/><br/>
            </div>
            <table className="table table-striped table-bordered">
              <thead class="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Ảnh</th>
                  <th>Tiêu đề</th>
                  <th>Tác giả</th>
                  <th>Thể loại</th>
                  <th>Ngày phát hành</th>
                  <th>Số trang</th>
                  <th>Đã bán</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td align="center">
                      <img className="hinhdaidien" src={"../" + book.img} />
                    </td>
                    <td>{book.tieude}</td>
                    <td>{book.tacgia}</td>
                    <td>{book.theloai}</td>
                    <td> {book.ngayphathanh}</td>
                    <td> {book.sotrang}</td>
                    <td> {book.soluong}</td>

                    <td>
                      <button data-id={book.id} onClick={handleView} className="btn btn-info">
                        View
                      </button>
                      <button data-id={book.id} onClick={handleDelete} className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a className="btn btn-warning" href="/book/0">
              Add a Book
            </a>
          </div>
        </form>
      ) : (
        <>


          {/* <button className="ml-8 mr-8 text-red-500 hover:text-red-700">
            <ShoppingCartIcon
              onClick={() => setOpen(true)}
              className="h-8 w-8  flex-none"
            />
          </button> */}

          <form id="formAction" method="" action="">
            <div className="container">
              <div className="row">
                <h1 className="listbook">List Books</h1><hr/><br/>
              </div>
              <table className="table table-striped table-bordered">
                <thead class="table-dark">
                  <tr>


                    <th>Ảnh</th>
                    <th>Tiêu đề</th>
                    <th>Tác giả</th>
                    <th>Thể loại</th>
                    <th>Đã bán</th>

                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {books.map((book) => (
                    <tr key={book.id}>

                      <td align="center">
                        <img className="hinhdaidien" src={"../" + book.img} />
                      </td>
                      <td>{book.tieude}</td>
                      <td>{book.tacgia}</td>
                      <td>{book.theloai}</td>
                      <td> {book.soluong}</td>



                      <td>
                        <button data-id={book.id} onClick={handleView} className="btn btn-info">
                          View
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default Books;
