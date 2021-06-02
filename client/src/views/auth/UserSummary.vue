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
                      Add New Account
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
                        <h4 class="ml-2 text-sm font-semibold text-red-500">
                          {{ errMsg }}
                        </h4>
                        <div class="flex flex-wrap">
                          <div class="w-full px-4">
                            <div class="relative w-full mb-3">
                              <label
                                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Account No.
                              </label>
                              <input
                                maxlength="12"
                                v-model="newAccount.accountNo"
                                class="border-0 px-3 py-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-semibold"
                                style="font-size: xx-large"
                              />
                            </div>
                          </div>
                          <div class="w-full px-4">
                            <div class="relative w-full mb-3">
                              <label
                                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Bank Name
                              </label>

                              <input
                                maxlength="12"
                                v-model="newAccount.bankName"
                                class="border-0 px-3 py-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-semibold"
                                style="font-size: xx-large"
                              />
                            </div>
                          </div>
                        </div>

                        <hr class="mt-6 border-b-1 border-blueGray-300" />

                        <button
                          class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-md mx-4 my-4 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                          type="button"
                          @click="addAccount"
                        >
                          Add New Account
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div
              class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
              :class="[
                color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white',
              ]"
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
                      Bank Accounts
                    </h3>
                  </div>
                </div>
              </div>
              <div class="block w-full overflow-x-auto">
                <!-- Projects table -->
                <table
                  class="items-center w-full bg-transparent border-collapse"
                >
                  <thead>
                    <tr>
                      <th
                        class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                        :class="[
                          color === 'light'
                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                            : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                        ]"
                      >
                        Bank Name
                      </th>
                      <th
                        class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                        :class="[
                          color === 'light'
                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                            : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                        ]"
                      >
                        Account No.
                      </th>
                      <th
                        class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                        :class="[
                          color === 'light'
                            ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                            : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                        ]"
                      >
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="a in accounts" :key="a.id">
                      <th
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                      >
                        {{ a.bankName }}
                      </th>
                      <td
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                      >
                        {{ a.accountNo }}
                      </td>
                      <td
                        class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                      >
                        ${{ a.balance }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative mb-4">
      <section class="py-4 bg-blueGray-600 mt-4">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap">
            <div class="lg:pt-12 pt-6 w-full md:w-12/12 px-4 text-center">
              <h2 class="text-3xl font-semibold text-blueGray-100">
                Transaction Services
              </h2>
            </div>
            <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400"
                  >
                    <i class="fas fa-award"></i>
                  </div>
                  <h6 class="text-xl font-semibold">
                    <button
                      class="bg-red-400 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      @click="$router.push('/user/withdraw')"
                    >
                      Withdraw
                    </button>
                  </h6>

                  <p class="mt-2 mb-4 text-blueGray-500">
                    Divide details about your product or agency work into parts.
                    A paragraph describing a feature will be enough.
                  </p>
                </div>
              </div>
            </div>

            <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400"
                  >
                    <i class="fas fa-retweet"></i>
                  </div>
                  <h6 class="text-xl font-semibold">
                    <button
                      class="bg-lightBlue-400 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      @click="$router.push('/user/transfer')"
                    >
                      Transfer to another account
                    </button>
                  </h6>
                  <p class="mt-2 mb-4 text-blueGray-500">
                    Keep you user engaged by providing meaningful information.
                    Remember that by this time, the user is curious.
                  </p>
                </div>
              </div>
            </div>

            <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400"
                  >
                    <i class="fas fa-fingerprint"></i>
                  </div>
                  <h6 class="text-xl font-semibold">
                    <button
                      class="bg-emerald-400 active:bg-emerald-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      @click="$router.push('/user/deposit')"
                    >
                      Deposit
                    </button>
                  </h6>
                  <p class="mt-2 mb-4 text-blueGray-500">
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough. Keep you user engaged!
                  </p>
                </div>
              </div>
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
  name: "UserSummary",
  data() {
    return {
      user: {},
      accounts: [],
      newAccount: {
        accountNo: "",
        bankName: "",
      },
      errMsg: "",
    };
  },
  created() {
    apiClient
      .loadUser()
      .then((res) => (this.user = res))
      .catch((err) => apiClient.log(err));

    apiClient
      .get("/accounts")
      .then((res) => (this.accounts = res.data))
      .catch((err) => apiClient.log(err));
  },
  methods: {
    addAccount() {
      apiClient
        .post("/accounts", {
          bankName: this.newAccount.bankName,
          accountNo: this.newAccount.accountNo,
        })
        .then((res) => {
          this.accounts.push(res.data);
          this.newAccount = {
            accountNo: "",
            bankName: "",
          };
        })
        .catch((err) => {
          this.errMsg = err.response.data.message;
        });
    },
  },
};
</script>
