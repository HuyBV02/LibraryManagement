import React, { useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";

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

function Users(props) {
  const [users, setUsers] = useState([]);
  const [usersOnFilter, setUsersOnFilter] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [role, setRole] = useState();
  const [login, setLogin] = useState();


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

  const handleChange = (e) => {
    if (e.target.value) {
      e.preventDefault();
      setUsersOnFilter(
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            user.brand.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setUsersOnFilter(users);
    }
  };

  const handleView = (e) => {
    e.preventDefault();
    const formSearch = document.getElementById("formAction");
    formSearch.setAttribute("action", `/user/${e.target.dataset.id}`);
    formSearch.submit();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    // console.log(e.target);
    if (
      window.confirm(`Are you sure to delete user ${e.target.dataset.id}`) ===
      true
    ) {
      // const formAction = document.getElementById('formAction');
      // formAction.setAttribute('action',`/users/delete/${e.target.dataset.id}`);
      // formAction.setAttribute('method',`GET`);
      // formAction.submit();
      fetch(`http://localhost:8080/users/delete/${e.target.dataset.id}`, {
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
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setUsersOnFilter(data);
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
      {/* Search filter */}
      {/* <div>
        <form
          id="formSearch"
          className="d-flex mt-3"
          role="search"
          action=""
          method="GET"
        >
          <input
            id="inputSearch"
            onChange={handleChange}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div> */}

      {/* users List filtered */}
      <div>
        <h1 className="text-center">Users List</h1>

        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ tên</th>
                <th>Tài khoản</th>
                <th>Mật khẩu</th>
                <th>Vai trò</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {usersOnFilter.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullname}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      data-id={user.id}
                      onClick={handleView}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      data-id={user.id}
                      onClick={handleDelete}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
        </div>
      </div>

      {/* Form action */}
      <form id="formAction" method="" action=""></form>
    </div>
  );
}

export default Users;
