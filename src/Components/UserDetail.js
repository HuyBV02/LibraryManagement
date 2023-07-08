import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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


function UserDetail() {
  const [user, setUser] = useState({
    id: "",
    fullname: "",
    username: "",
    password: "",
    role: "",
  });
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const [formUpdate, setFormUpdate] = useState(user);
  const confirmMsg =
    id === "0"
      ? "Are you sure to add this user?"
      : "Are you sure to update this user?";
  const navigate = useNavigate();
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


  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    setFormUpdate({ ...user, [event.target.name]: event.target.value });
    // console.log(formUpdate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormUpdate(user);

    if (window.confirm(confirmMsg) === true) {
      fetch(`http://localhost:8080/save/${id}`, {
        method: id === "0" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formUpdate),
      })
        .then((response) => {
          // handle response
          if (response.ok) {
            return response.text();
          }
        })
        .then((data) => {
          alert(data);
          navigate("/users", { replace: true });
          // console.log(data);
        })
        .catch((error) => {
          // handle error
          setMsg(error);
          console.log(msg);
        });
    }

    // console.log(formUpdate);
  };

  useEffect(() => {
    if (id !== "0") {
      fetch(`http://localhost:8080/user/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setFormUpdate(data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

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



      <h1>Edit User</h1>
      {/* <form id="formUpdate" onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="id" className="col-sm-2 col-form-label">
            ID
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="id"
              value={user.id}
              disabled
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="fullname" className="col-sm-2 col-form-label">
            Fullname
          </label>
          <div className="col-sm-10">
            <input
              className="flex w-72 flex-col gap-6"
              type="text"
              id="fullname"
              name="fullname"
              onChange={handleChange}
              value={user.fullname}

            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              value={user.username}
              disabled
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              id="password"
              name="password"
              onChange={handleChange}
              value={user.password}
              disabled
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="role" className="col-sm-2 col-form-label">
            Role
          </label>
          <div className="col-sm-10">
            <select
              type="text"
              name="role"
              id="role"
              value={user.role}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit">Update</button>
        </form> */}

      <form id="formAction" className="mx-8" onSubmit={handleSubmit}>

        <div className="space-y-12 w-full h-full bg-white rounded-lg mt-8">
          <div className="border-b border-gray-900/10 py-4">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 mx-8 lg:grid-cols-2">
              <div className="flex flex-col">
                <div className="flex ">
                  <div className="mr-4 w-1/2">
                    <label
                      htmlFor="fullname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      FullName
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="fullname"
                          id="fullname"
                          className="disabled:cursor-not-allowed block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          value={user.fullname}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-1/2">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="disabled:cursor-not-allowed block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          value={user.username}
                          onChange={handleChange}
                          required
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-1/2 mr-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="password"
                          id="password"
                          className="disabled:cursor-not-allowed block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Ngày phát hành"
                          value={user.password}
                          onChange={handleChange}
                          required
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>




                <div className="sm:col-span-4">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Role
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <select
                        type="text"
                        name="role"
                        id="role"
                        className="disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        placeholder="Thể loại"
                        value={user.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="" hidden>
                          -- Role --
                        </option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER">USER</option>


                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default UserDetail;
