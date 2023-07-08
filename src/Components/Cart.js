import React, { useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";


const navigation1 = [
  { name: "Trang chủ", href: "/books", current: true },
  { name: "QLND", href: "/users", current: false },
  // { name: "Đơn hàng", href: "#", current: false },
];
const navigation2 = [
  { name: "Trang chủ", href: "/books", current: true },

  { name: "Giỏ hàng", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


function Carts(props) {
  const [carts, setCarts] = useState([]);
  // const [cartsOnSearch, setCartsOnSearch] = useState([]);
  const [username, setUsername] = useState(window.localStorage.getItem('username'));
  const [deleted, setDeleted] = useState(false);
  const [role, setRole] = useState();
  const [login, setLogin] = useState();
  const navigation = useNavigate()

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

  console.log(username)


  const handleCheckout = (e) => {
    e.preventDefault();
    if (
      window.confirm(`Are you sure to pay ?`)
    ) {
      // return console.log(carts)
      fetch("http://localhost:8080/carts/checkout/all", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carts)
      })
        .then((response) => response.text())
        .then((data) => {
          alert(data);
          setDeleted(!deleted);
          setCarts([]);
          navigation("/books")
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (
      window.confirm(`Are you sure to delete item ${e.target.dataset.id}`)
    ) {

      fetch(`http://localhost:8080/carts/delete/${e.target.dataset.id}`, {
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


  // const handleSubmit = () => {
  //   const formSearch = document.getElementById('formSearch');
  //   const inputSearch = document.getElementById('inputSearch');
  //   formSearch.setAttribute('action', `/carts/search/${inputSearch.value}`);
  //   formSearch.onsubmit();
  // };

  // const handleView = (e) => {
  //   e.preventDefault();
  //   const formSearch = document.getElementById('formSearch');
  //   formSearch.setAttribute('action',`/cart/${e.target.dataset.id}`);
  //   formSearch.submit();
  // };

  useEffect(() => {
    fetch(`http://localhost:8080/carts/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setCarts(data);
        console.log(data)
      })
      .catch((err) => console.log(err));
  }, [deleted]);

  return (
    <div>

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





      <form id="formAction" >
        <div>
          <strong className="text-center">Carts</strong><br /><br /><hr /><hr />

          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Tên sách</th>
                  <th>Số lượng</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {carts.map((cart) => (
                  <tr key={cart.id}>
                    <td>{cart.tensach}</td>
                    <td>{cart.soluong}</td>
                    <td>
                      <button data-id={cart.id} onClick={handleDelete} className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <button data-id={carts.id} class="btn btn-primary btn-md" type="submit button" onClick={handleCheckout}>
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;Thanh toán
          </button>

        </div>



        {/* Form action */}
      </form>
    </div>
  );
}

export default Carts;
