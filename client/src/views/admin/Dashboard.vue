<template>
  <div>
    <section class="relative block" style="height:220px;">
      <div
        class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
        style="transform: translateZ(0);"
      >
        <svg
          class="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            class="text-blueGray-200 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </section>
    <section class="relative py-16 bg-blueGray-200">
      <div class="container mx-auto px-4">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
        >
          <div class="px-6">
            <div class="text-center mt-3">
              <h3
                class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
              >
                {{ user.firstName }} {{ user.lastName }}
              </h3>
              <div
                class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
              >
                <i
                  class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"
                ></i>
                {{ user.email }}
              </div>
            </div>
            <section class="py-0 bg-blueGray-600">
              <div class="container mx-auto px-4">
                <div class="flex flex-wrap">
                  <div class="lg:pt-12 pt-6 w-full md:w-12/12 px-4 text-center">
                    <h2 class="text-3xl font-semibold text-blueGray-100 mb-8">
                      Add/Update User
                    </h2>
                  </div>
                  <div
                    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
                  >
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <form>
                        <h6
                          class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase"
                        >
                          Enter Required Information
                        </h6>
                        <div class="flex flex-wrap">
                          <div class="w-full px-4">
                            <div class="relative w-full mb-3">
                              <label
                                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                First Name
                              </label>
                              <input
                                maxlength="12"
                                v-model="editingUser.firstName"
                                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-semibold"
                                style="font-size: large"
                              />
                            </div>
                          </div>
                          <div class="w-full px-4">
                            <div class="relative w-full mb-3">
                              <label
                                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Last Name
                              </label>
                              <input
                                maxlength="12"
                                v-model="editingUser.lastName"
                                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-semibold"
                                style="font-size: large"
                              />
                            </div>
                          </div>
                          <div class="w-full px-4">
                            <div class="relative w-full mb-3">
                              <label
                                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                v-model="editingUser.email"
                                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-semibold"
                                style="font-size: large"
                              />
                            </div>
                          </div>
                          <div class="w-full px-4" v-if="!isEditing">
                            <div class="relative w-full mb-3">
                              <label
                                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                v-model="editingUser.password"
                                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-semibold"
                                style="font-size: large"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="w-full px-4" v-if="isEditing">
                          <div class="relative w-full mb-3">
                            <label
                              class="inline-flex items-center cursor-pointer"
                            >
                              <input
                                id="customCheckLogin"
                                v-model="editingUser.isActive"
                                type="checkbox"
                                class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                              />
                              <span
                                class="ml-2 text-sm font-semibold text-blueGray-600"
                              >
                                Active
                              </span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <span class="ml-2 text-sm font-semibold text-red-500">
                            {{ errMsg }}
                          </span>
                        </div>
                        <hr class="mt-6 border-b-1 border-blueGray-300" />

                        <button
                          class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-md mx-4 my-4 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          type="button"
                          @click="addUser"
                        >
                          {{ isEditing ? "Update" : "Add" }} User
                        </button>

                        <button
                          class="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-md mx-4 my-4 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          type="button"
                          @click="clear"
                        >
                          Clear
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>

    <section class="relative mb-4">
      <section class="py-4 bg-blueGray-600 mt-4">
        <div class="container mx-auto px-4">
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
            :class="[color === 'light' ? 'bg-white' : 'text-white']"
          >
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3
                    class="font-semibold text-lg"
                    :class="[
                      color === 'light' ? 'text-blueGray-700' : 'text-white',
                    ]"
                  >
                    Manager Users
                  </h3>
                </div>
              </div>
            </div>
            <div class="block w-full overflow-x-auto">
              <table class="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th
                      class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                      :class="[
                        color === 'light'
                          ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                          : 'bg-blueGray-800 text-emerald-300 border-emerald-700',
                      ]"
                    >
                      Name
                    </th>
                    <th
                      class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                      :class="[
                        color === 'light'
                          ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                          : 'bg-blueGray-800 text-emerald-300 border-emerald-700',
                      ]"
                    >
                      Email
                    </th>
                    <th
                      class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                      :class="[
                        color === 'light'
                          ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                          : 'bg-blueGray-800 text-emerald-300 border-emerald-700',
                      ]"
                    >
                      Role
                    </th>
                    <th
                      class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                      :class="[
                        color === 'light'
                          ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                          : 'bg-blueGray-800 text-emerald-300 border-emerald-700',
                      ]"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="u in users" :key="u.id">
                    <th
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                    >
                      {{ u.firstName ? u.firstName : "-" }}
                      {{ u.lastName ? u.lastName : "-" }}
                    </th>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                      {{ u.email }}
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                      {{ u.isAdmin ? "Admin" : "Normal User" }}
                    </td>
                    <td
                      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                      <button
                        v-if="!u.isAdmin"
                        class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-md mx-3 my-3 px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        @click="editUser(u.id)"
                      >
                        <span
                          ><i class="fas fa-edit text-gray-500 mr-4"></i></span
                        >Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
import apiClient from "../../foundation/apiHandler";
export default {
  name: "UserManagement",
  data() {
    return {
      color: "light",
      user: {},
      users: [],
      editingUser: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      isEditing: false,
      errMsg: "",
    };
  },
  created() {
    apiClient
      .loadUser()
      .then((res) => (this.user = res))
      .catch((err) => apiClient.log(err));

    apiClient
      .get("/admin/usermanagement")
      .then((res) => (this.users = res.data))
      .catch((err) => apiClient.log(err));
  },
  methods: {
    addUser() {
      this.errMsg = "";
      if (
        !this.editingUser.firstName ||
        this.editingUser.firstName.trim().length == 0 ||
        !this.editingUser.lastName ||
        this.editingUser.lastName.trim().length == 0 ||
        !this.editingUser.email ||
        this.editingUser.email.trim().length == 0
      ) {
        this.errMsg = "Incomplete information.";
        return;
      }
      if (this.isEditing) {
        apiClient
          .patch(
            `/admin/usermanagement/${this.editingUser.id}`,
            this.editingUser
          )
          .then((res) => {
            this.users.push(res.data);
            this.clear();
          })
          .catch((err) => {
            this.errMsg = err.response.data.message
              ? err.response.data.message
              : err.response.data;
          });
      } else {
        if (
          !this.editingUser.password ||
          this.editingUser.password.trim().length == 0
        ) {
          this.errMsg = "Password required.";
          return;
        }
        apiClient
          .post("/admin/usermanagement", this.editingUser)
          .then((res) => {
            this.users.push(res.data);
            this.clear();
          })
          .catch((err) => {
            this.errMsg = err.response.data.message
              ? err.response.data.message
              : err.response.data;
          });
      }
    },
    editUser(userId) {
      const curUser = this.users.find((u) => u.id == userId);
      this.isEditing = true;
      this.editingUser = curUser;
    },
    clear() {
      this.isEditing = false;
      this.errMsg = "";
      this.editingUser = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      };
    },
  },
};
</script>
