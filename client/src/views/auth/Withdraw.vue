<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <section class="relative mb-4">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg"
        >
          <div class="px-6">
            <div class="text-center mt-3">
              <h3
                class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
              >
                {{ $store.state.currentUser.firstName }}
                {{ $store.state.currentUser.lastName }}
              </h3>
              <div
                class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
              >
                <i
                  class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"
                ></i>
                {{ $store.state.currentUser.email }}
              </div>
            </div>
          </div>
        </div>
        <section class="py-0 bg-blueGray-600">
          <div class="container mx-auto px-4">
            <div class="flex flex-wrap">
              <div class="lg:pt-12 pt-6 w-full md:w-12/12 px-4 text-center">
                <h2 class="text-4xl font-semibold text-blueGray-100 mb-8">
                  Withdraw
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
                      {{ msg }}
                    </h4>
                    <div class="flex flex-wrap">
                      <div class="w-full lg:w-6/12 px-4">
                        <div class="relative w-full mb-3">
                          <label
                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Select Source Account
                          </label>

                          <select
                            v-model="selectedAccount"
                            @change="setBalance"
                          >
                            <option
                              v-for="a in accounts"
                              :key="a.id"
                              v-bind:value="a.accountNo"
                              >{{ a.bankName }} - {{ a.accountNo }} [BAL =
                              {{ a.balance }}]</option
                            >
                          </select>
                        </div>
                      </div>

                      <div class="w-full lg:w-6/12 px-4">
                        <div class="relative w-full mb-3">
                          <label
                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Amount To Withdraw
                          </label>
                          <input
                            type="number"
                            v-model="amount"
                            class="border-0 px-3 py-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-semibold"
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
                            Reason
                          </label>

                          <textarea
                            type="text"
                            v-model="comment"
                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            rows="3"
                          >
                          </textarea>
                        </div>
                      </div>
                    </div>

                    <hr class="mt-6 border-b-1 border-blueGray-300" />

                    <button
                      class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-md mx-4 my-4 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                      @click="withdraw"
                    >
                      Withdraw
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>
<script>
import apiHandler from "@/foundation/apiHandler";
export default {
  name: "withdraw",
  data() {
    return {
      accounts: [],
      selectedAccount: null,
      amount: 0,
      comment: "",
      msg: "",
    };
  },
  created() {
    this.loadAccounts();
  },
  methods: {
    withdraw() {
      apiHandler
        .post("/transactions/withdraw", {
          srcAccountNo: this.selectedAccount,
          amount: this.amount,
          comment: this.comment,
        })
        .then((res) => {
          this.msg = "Withdrawal successful";
          this.amount = 0;
          this.selectedAccount = "";
          this.comment = "";
          this.loadAccounts();
        })
        .catch((err) => {
          this.msg = err.response.data.message;
          apiHandler.log(err.response.data.message);
        });
    },
    loadAccounts() {
      apiHandler
        .get("/accounts")
        .then((res) => (this.accounts = res.data))
        .catch((err) => apiHandler.log(err.response.data));
    },
  },
};
</script>
